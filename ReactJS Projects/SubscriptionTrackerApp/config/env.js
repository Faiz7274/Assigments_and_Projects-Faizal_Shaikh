import { config } from "dotenv";

// Ensure dotenv is loaded before destructuring
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Destructure after dotenv has loaded
export const { 
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY } = process.env;
