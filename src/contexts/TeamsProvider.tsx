import { TeamsContextTyp } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

/* 
 WORKFLOW: 
 > we'll 've team | teams thats created be the user with the owner's role.
 > we got to dist its details to whoever wants it while staying clean.
*/

const initTeamState: TeamsContextTyp = {
    currentTeamId: "",
    updateCurrentTeamId: () => { },
    currentTeamname: "",
    updateCurrentTeamname: () => { },
    Teams: { total: 0, teams: [] },
    updateTeams: () => { }
} //this is what the TeamsContext looks like when theres no context provider up in the tree.

const TeamsContext = createContext(initTeamState)

export function TeamsProvider({ children }: { children: React.ReactNode }) {
    /* 
      NOTE:  teams is an Team[].
    */
    const [teamId, updateTeamId] = useState("")
    const [teamname, updateTeamname] = useState("")
    const [teams, updateTeams] = useState({
        total: 0,
        teams: [],
    })

    //  NOTE:  this is a side effect of changing the teamname. you change the teamname from the menu and it updates the teamId accordingly.
    useEffect(() => {
        //  NOTE:  we're going to get the TeamId from the local storage once this provider is mounted.
        const teamid = localStorage.getItem(teamname) || ""

        // smart move.
        if (teamid !== "") {
            console.log("updating TeamId...")
            updateTeamId(() => teamid)
        } else {
            console.log(`TeamId not found for ${teamname}`)
        }

    }, [teamname])

    const TeamsRelatedUtils: TeamsContextTyp = {
        currentTeamId: teamId,
        updateCurrentTeamId: updateTeamId,
        currentTeamname: teamname,
        updateCurrentTeamname: updateTeamname,
        Teams: teams,
        // @ts-ignore
        updateTeams: updateTeams,
    }
    /* 
     TODO: 
     > provide a callbk to update the Team | Teams created.  NOTE:   thats going to be the update callbk returned from the useState.
     > provide details about team's members.  NOTE:   teams.listMemberships()
    */
    return (
        <TeamsContext.Provider value={TeamsRelatedUtils}>
            {children}
        </TeamsContext.Provider>
    )
}

export default function useTeamsProvider() { return useContext(TeamsContext) }

/* 
  WORKFLOW: 
 1. we dont want to update TeamId until a team's created by the current user.
 2. we got to list the teams the current user is a member of.
 3. then we got to figure out which one to choose to send the invitation to the users.
*/