import mongoose from 'mongoose';
import {DATABASE_URL} from "../config/config.js";

export const dbconnection=async ()=> {
    try {
       const result=await mongoose.connect(DATABASE_URL);
       console.log(`Database connected successfully.`);

    }catch(err){
        console.log("database connection failed please try again" +err);
    }
}