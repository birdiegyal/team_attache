import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTeam, createEmailSession, createUserAc } from "../appwrite/api";
import { globalUserAc, createTeamArgTyp, userTyp4Auth, SessionCredsTyp } from "@/types";
import { queryKeys } from "./keys";

export function createTeamMutation() {
    return useMutation({
        mutationFn: (args: createTeamArgTyp) => CreateTeam(args),
        /* 
         POSSIBILITIES: 
         if we're displaying team's created by a user, we got to invaldate query responsible for getting teams from appwrite those're created by the current user.
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