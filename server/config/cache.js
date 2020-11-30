import dotenv from "dotenv";
dotenv.config();

export const { REDIS_URL, REDIS_PASSWORD } = process.env;
