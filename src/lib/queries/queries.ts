import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTeam, InviteMembers, createEmailSession, createUserAc, getImagesForDemo1, getTeamMembers, getTeams } from "../appwrite/api";
import {  createTeamArgTyp, userTyp4Auth, SessionCredsTyp, inviteMembersArgTyp } from "@/types";
import { queryKeys } from "./keys";

export function createTeamMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (args: createTeamArgTyp) => CreateTeam(args),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_TEAMS]
            })
        }
        /* 
         POSSIBILITIES: 
         if we're displaying teams created by a user, we got to invaldate query responsible for getting teams from appwrite those're created by the current user.
        */
    })
}

export function useCreateUserAcMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (user: userTyp4Auth) => (createUserAc(user)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.CREATE_USER_AC],
            })
        }
    })
}

export function useCreateUserSessionMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (sessionCreds: SessionCredsTyp) => (createEmailSession(sessionCreds)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.CREATE_EMAIL_SESSION]
            })
        }
    })
}

export function inviteTeamMembersMutation() {
    return useMutation({
        mutationFn: ({ members, TeamId: teamId }: inviteMembersArgTyp) => (InviteMembers({members, TeamId: teamId}))
    })
}

export function getTeamsForCurrentUSer() {
    return useQuery({
        queryKey: [queryKeys.GET_TEAMS,],
        queryFn: getTeams,
    })
}

export function getImgsPreviewFishbone() {
    return useQuery({
        queryKey: [queryKeys.GET_IMGS_FISHBONE,],
        queryFn: () => getImagesForDemo1(),
    })
}

export function getTeamMembership(TeamId: string) {
    return useQuery({
        queryKey: [queryKeys.GET_TEAM_MEMBERSHIP,],
        queryFn: () => getTeamMembers(TeamId)
    })
}
