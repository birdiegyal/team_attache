export type createTeamArgTyp = {
    teamname: string,
    roles: string[]
}

export type teamMemberTyp = {
    email: string,
    roles: string[],
}

export type inviteMembersArgTyp = {
    teamId: string,
    role: string,
    email: string,
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

export type FormValues = {
    email: string,
    members?: {
        email: string
        role?: string
    }[]
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