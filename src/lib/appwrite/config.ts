import { Client, Teams } from "appwrite"

export const appwriteConfig = {
    projectId: import.meta.env.VITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_ENDPOINT,
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    
export const teams = new Teams(client)