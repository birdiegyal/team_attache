import { Account, Avatars, Client, Databases, Storage, Teams } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_PROJECT_ID,
  fishboneId: import.meta.env.VITE_FISHBONE_PROJECT_ID,
  endpoint: import.meta.env.VITE_ENDPOINT,
  dbId: import.meta.env.VITE_DB_ID,
  usersColl: import.meta.env.VITE_USERS_COLL,
  fishboneBucketId: import.meta.env.VITE_FISHBONE_BUCKET_ID,
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);


export const teams = new Teams(client);
export const databases = new Databases(client);
export const account = new Account(client);
export const avatars = new Avatars(client);

//  NOTE:  this  client is for retrieving files from fishbone's loot bucket
export const fishboneClient = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.fishboneId);
export const fishboneStorage = new Storage(fishboneClient);

