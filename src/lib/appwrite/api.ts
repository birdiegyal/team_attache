import { SessionCredsTyp, createTeamArgTyp, inviteMembersArgTyp, updateMembershipTyp, userTyp4Auth } from "@/types";
import { account, appwriteConfig, avatars, databases, teams } from "./config";
import {
    ID, Query
} from 'appwrite'

export async function getCurrentUser() {
    try {
        const currentUser = await account.get()
        if (!currentUser) throw Error

        const currentUserDoc = await databases.listDocuments(
            appwriteConfig.dbId,
            appwriteConfig.usersColl,
            [Query.equal("accountId", currentUser.$id)]
        )

        if (!currentUserDoc) throw Error

        return currentUserDoc.documents[0]

    } catch (error) {
        console.error(error)
        return false
    }
}

export async function createUserAc(user: userTyp4Auth) {
    try {
        const newUserAc = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username
        )

        if (!newUserAc) throw Error

        const avatar = avatars.getInitials(user.username, 60, 60)

        const userAc = await databases.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.usersColl,
            ID.unique(),
            {
                accountId: newUserAc.$id,
                username: newUserAc.name,
                email: newUserAc.email,                
                avatar: avatar,                
            })

        return userAc

    } catch (error) {
        console.error(error);
        return null
    }
}

export async function CreateTeam(args: createTeamArgTyp) {
    // REQUIREMENTS: 
    // got to create a team with defined roles
    // RETURN: 
    // Team model from team.create()

    try {
        const res = await teams.create(ID.unique(), args.teamname, args.roles)
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function InviteMembers(args: inviteMembersArgTyp) {
    // REQUIREMENTS: 
    // got to invite members => iterate over a set of users and invite em all at once.
    // RETURN: 
    // Membership model from team.createMembership()

    try {
        
        const res = await teams.createMembership(args.teamId, args.roles, args.email)
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function UpdateMembershipStatus(args: updateMembershipTyp) {
    // REQUIREMENTS: 
    // got to update the membership status when the user's redirected to the url specified in the InviteMembers().
    // RETURN: 
    // Membership model from team.updateMembershipStatus()

    try {
        const res = await teams.updateMembershipStatus(args.teamId, args.membershipId, args.userId, args.secret)
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function createEmailSession(sessionCreds: SessionCredsTyp) {
    try {
        const session = await account.createEmailSession(sessionCreds.email, sessionCreds.password)
        return session
    } catch (error) {
        console.error(error)
        return null
    }
}