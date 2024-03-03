import { Models } from "appwrite"
import { Dispatch, SetStateAction,  } from "react"

export type createTeamArgTyp = {
    teamname: string,
    roles: string[]
}

export type FormValues = {
    email: string, // this is for the email field so that you could enter the 
    members?: teamMemberTyp[]
}

export type teamMemberTyp = {
    email: string,
    roles: string
}

export interface inviteMembersArgTyp {
    members: Set<teamMemberTyp>,
    TeamId: string,
}

export type updateMembershipTyp = {
    teamId: string,
    membershipId: string,
    userId: string,
    secret: string,
}

export type globalUserAc = {
    username: string,
    phNo?: number,
    email: string,
    avatar: string,
    accountId: string,
}

export type userTyp4Auth = {
    email: string,
    password: string,
    username: string,
}

export type SessionCredsTyp = {
    email: string,
    password: string,
}



export type RoleDropdownMenuPropsTyp = {
    field: Object & { id: string },
    ivkOnClickToChangeRole: Function,
    index: number,
}

export enum Role {
    Member = "Member",
    Leader = "Leader",
    Owner = "Owner",
    Analyst = "Analyst"
}

export interface InvitationReturnTyp extends Partial<Models.Membership> {
    status: boolean, //false => invitation failed.
}

export interface TeamPreferences {
    roles: string[],
}

export interface TeamsContextTyp {
    currentTeamId: string,
    updateCurrentTeamId: Dispatch<SetStateAction<string>>,
    currentTeamname: string,
    updateCurrentTeamname: Dispatch<SetStateAction<string>>,
    Teams: Models.TeamList<TeamPreferences>
    updateTeams: Dispatch<SetStateAction<Models.TeamList<TeamPreferences>>>,
}


