import {
  SessionCredsTyp,
  createTeamArgTyp,
  inviteMembersArgTyp,
  updateMembershipTyp,
  userTyp4Auth,
  OperationType,
  PermissionControlForResource,
} from "@/types";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  fishboneStorage,
  teams,
} from "./config";
import { ID, Permission, Query, Role } from "appwrite";

export async function getCurrentUser() {
  try {
    const currentUser = await account.get();
    if (!currentUser) throw Error;

    const currentUserDoc = await databases.listDocuments(
      appwriteConfig.dbId,
      appwriteConfig.usersColl,
      [Query.equal("accountId", currentUser.$id)]
    );

    if (!currentUserDoc) throw Error;

    return currentUserDoc.documents[0];
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createUserAc(user: userTyp4Auth) {
  try {
    const newUserAc = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    if (!newUserAc) throw Error;

    const avatar = avatars.getInitials(user.username, 60, 60);

    const userAc = await databases.createDocument(
      appwriteConfig.dbId,
      appwriteConfig.usersColl,
      ID.unique(),
      {
        accountId: newUserAc.$id,
        username: newUserAc.name,
        email: newUserAc.email,
        avatar: avatar,
      }
    );

    return userAc;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function CreateTeam(args: createTeamArgTyp) {
  // REQUIREMENTS:
  // got to create a team with defined roles
  // RETURN:
  // Team model from team.create()

  try {
    const res = await teams.create(ID.unique(), args.teamname);

    if (res) {
      const setPreferences = await teams.updatePrefs(res.$id, {
        roles: args.roles,
      });

      if (setPreferences) {
        return res;
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function InviteMembers({
  members,
  TeamId: teamId,
}: inviteMembersArgTyp) {
  // REQUIREMENTS:
  // got to invite members => iterate over a set of users and invite em all at once.
  /* 
     NOTE: 
    > should be able to tell what invite reqs failed and what invitations re succesfully done.
    > currently's only able to invite members to a single team.
     WORKFLOW: 
    we'll build an obj of type InvitationReturnTyp[] that mentions all of the details required.
    */
  // RETURN:
  // PromiseSet<InvitationReturnTyp>
  const res = new Set();

  for (let member of members) {
    const url = "http://localhost:5173/acceptinvite";
    const ans = await teams.createMembership(
      teamId,
      [member.roles],
      member.email,
      undefined,
      undefined,
      url
    );
    res.add(ans);
  }

  return Promise.allSettled(res);
}

export async function UpdateMembershipStatus(args: updateMembershipTyp) {
  // REQUIREMENTS:
  // got to update the membership status when the user's redirected to the url specified in the InviteMembers().
  // RETURN:
  // Membership model from team.updateMembershipStatus()

  try {
    const res = await teams.updateMembershipStatus(
      args.teamId,
      args.membershipId,
      args.userId,
      args.secret
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createEmailSession(sessionCreds: SessionCredsTyp) {
  try {
    const session = await account.createEmailSession(
      sessionCreds.email,
      sessionCreds.password
    );
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTeams() {
  try {
    const teamslist = await teams.list();
    return teamslist;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getImagesForDemo1() {
  /*
      WORKFLOW: 
     1. we'll get the list of all the files within the bucket using a query for *.jpg
     2. then we'll iterate throught the same arr to get the fileid for preview.
     3. we'll get the preview links within array to return.    
    */
  try {
    const { files, total } = await fishboneStorage.listFiles(
      appwriteConfig.fishboneBucketId,
      undefined,
      "*.jpg"
    );
    console.log(files, total);

    const imgPreviews: string[] = [];

    for (const file of files) {
      console.log(file);
      const imgPreview = await fishboneStorage.getFilePreview(
        appwriteConfig.fishboneBucketId,
        file.$id,
        400,
        400,
        "top",
        60
      );
      imgPreviews.push(imgPreview.toString());
    }

    return { imgPreviews, total };
  } catch (error) {
    console.log("oh shit!!");
    console.error(error);
    return null;
  }
}

export async function updatePermissionsForResources(
  args: PermissionControlForResource
) {
  /*
      NOTE:  this f() is to update the permissions for a single resource.
    */

  /*
      WORKFLOW: 
     1. get the file id for the Resrc.
     2. get the role and the team id to update the permissions and the operation type.
    */

  /*
      POSSIBILITIES: 
     1. may be we need to assign multiple privileges like read and write. in that case we got to call this method for individual privileges.
     */
  let res;

  try {
    switch (args.operationType) {
      case OperationType.Delete:
        res = fishboneStorage.updateFile(
          appwriteConfig.fishboneBucketId,
          args.fileId,
          undefined,
          [Permission.delete(Role.team(args.teamId, args.role))]
        );
        break;

      case OperationType.Read:
        res = fishboneStorage.updateFile(
          appwriteConfig.fishboneBucketId,
          args.fileId,
          undefined,
          [Permission.read(Role.team(args.teamId, args.role))]
        );
        break;
      case OperationType.Update:
        res = fishboneStorage.updateFile(
          appwriteConfig.fishboneBucketId,
          args.fileId,
          undefined,
          [Permission.update(Role.team(args.teamId, args.role))]
        );
        break;
      case OperationType.Write: // grant create, update, and delete access
        res = fishboneStorage.updateFile(
          appwriteConfig.fishboneBucketId,
          args.fileId,
          undefined,
          [Permission.write(Role.team(args.teamId, args.role))]
        );
        break;
    }

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTeamMembers(teamId: string) {
  try {
    const teamMembers = await teams.listMemberships(teamId);
    return teamMembers;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function getAllCollections() {
//   try {
//     const colls = await databases.
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
