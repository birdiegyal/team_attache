export type createTeamArgTyp = {
    teamname: string,
    roles: string[]
}

export type inviteMembersArgTyp = {
    teamId: string, 
    roles: string[],
    email: string,
}

export type updateMembershipTyp = {
    teamId: string,
    membershipId: string, 
    userId: string,
    secret: string, 
}