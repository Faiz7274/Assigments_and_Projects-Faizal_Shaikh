import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req , res , next) => {
    //this is not a user session. It is a "Mongoose Transaction"
    //Atomic Operations -> Insert Works Completely or It doesnt
    const session = await mongoose.startSession();
    session.startTransaction();   
    try{
        //Create a new user
        const { name, email,password} = req.body;

        const exisitingUser = await User.findOne({email});
        
        if(exisitingUser){
            const error = new Error('User Already Exsits');
            error.statusCode = 409;
            throw error;
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create([{name,email,password: hashedPassword}] , {session});
        const token = jwt.sign({ userId: newUser[0]._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'New User Created Successfully',
            data: {
                token,
                user: newUser[0],
            }
        })
    }

    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
    

};

export const signIn = async (req , res , next) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user)
        {
            const error = new Error('User Not Found');
            error.statusCode = 404 ; 
            throw error;
        }

        const isPassValid = await bcrypt.compare(password, user.password);

        if(!isPassValid)
        {
            const error = new Error('Invalid Password');
            error.statusCode = 401 ; 
            throw error;
        }

        const token = jwt.sign({ userId: user._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});
        
        res.status(200).json({
            success: true,
            message: 'User Signed in Successfully',
            data: {
                token,
                user,
            }
        });
    }

    catch(error)
    {
        next(error);
    }
};

export const signOut = async (req , res , next) => {};