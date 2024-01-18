import { createTeamArgTyp } from "@/types";
import { teams } from "./config";
import {
    ID
} from 'appwrite'


export async function CreateTeam(args: createTeamArgTyp) {
    // REQUIREMENTS: 
    // got to create a team with defined roles
    // RETURN: 
    // Team model from team.create()

    try {
        const res = await teams.create(ID.unique(), args.teamname, args.roles )
        return res
    } catch (error) {
        console.error(error)        
    }
}

export async function InviteMembers(args: inviteMembersArgTyp) {

    
}

