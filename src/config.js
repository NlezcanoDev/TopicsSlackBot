import { config } from "dotenv";

config();

export const DATABASE_URI = process.env.LOCAL_URI || "mongodb://localhost/config";
