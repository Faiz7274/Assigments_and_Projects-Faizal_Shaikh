import mongoose from "mongoose";
import { DB_URI,NODE_ENV, PORT } from "../config/env.js";

if(!DB_URI)
{
    throw new Error("Please Define MONGODB URI env");
}

const connectToDB = async () => {
    try
    {
        await mongoose.connect(DB_URI);
        console.log(`Connected to DB on PORT ${PORT} in ${NODE_ENV} mode`);
    }

    catch(err)
    {
        console.error("Error in connecting to DB ", err)
    }
}

export default connectToDB;