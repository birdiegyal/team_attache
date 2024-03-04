import { Account, Avatars, Client, Databases, Teams } from "appwrite"

export const appwriteConfig = {
    projectId: import.meta.env.VITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_ENDPOINT,
    dbId: import.meta.env.VITE_DB_ID,
    usersColl: import.meta.env.VITE_USERS_COLL,
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    
export const teams = new Teams(client)
export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)
