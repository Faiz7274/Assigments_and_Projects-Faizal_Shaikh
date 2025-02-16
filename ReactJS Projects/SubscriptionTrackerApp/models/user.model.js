import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required : [true, 'User Name is required'],
        trim : true,
        minLength: 3,
        maxLength: 50,
    },
    
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    }
},  { timestamps: true} )

const User = mongoose.model("User", userSchema);

export default User;