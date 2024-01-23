import { createContext, useContext, useEffect, useState } from "react";
import * as React from "react"
import { getCurrentUser } from "@/lib/appwrite/api";
import { globalUserAc } from "@/types";
import { useNavigate } from "react-router-dom";

export const initVal: globalUserAc = {
    username: "",
    phNo: undefined,
    email: "",
    avatar: "",
    accountId: ""
}

type React = typeof React

export const initState = {
    user: initVal,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => { },
    checkUserAuth: async () => false as boolean,
}

const authContext = createContext(initState)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()

    // NOTE:  this state is maintained to 
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // NOTE:  we need a state for user because we'll be exposing updateUserProfile f()ality.so we got to change it.
    const [user, setUser] = useState<globalUserAc>(initVal)

    // NOTE:  this state is maintained to provide the visual feedback to the end user.
    const [isLoading, setIsLoading] = useState(false)

    async function checkUserAuth() {
        /* 
         WORKFLOW: 
         1. first we gon set the loading state to true.
         2. then we gon get the currently logged in user. if any, we gon set the user state. return false, otherwise.
        */

        setIsLoading(true)

        try {
            // the document will contain props more than the props in initVal. but thats the whole case
            // Ts looks for the subset of the props defined in the assertion.
            const userDoc = await getCurrentUser()

            if (userDoc) {
                setUser({
                    username: userDoc.username,
                    phNo: userDoc.phNo,
                    
                    email: userDoc.email,
                    avatar: userDoc.avatar,
                    
                    accountId: userDoc.$id,
                })
                setIsAuthenticated(true)
                return true
            } else {
                return userDoc
            }

        } catch (error) {
            console.error(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {

        /* 
         WORKFLOW: 
         1. we gon check our local storage for cookies.
         2. if not found, navigate to the signin pg.
        */

        // that's that lookup.
        if (localStorage.getItem("cookieFallback") === "[]" || localStorage.getItem("cookieFallback") === null) {
            navigate("./signin")
        }

        checkUserAuth()

    }, [])
    // since, the dependencies array is empty it => that this effect is only seen once [ when this component mounts. ].

    const authDataStore = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkUserAuth,
    }

    return (

        // @ts-ignore
        <authContext.Provider value={authDataStore}>
            {children}
        </authContext.Provider >
    )
}

export function useUserContext() {
    return useContext(authContext)
}
