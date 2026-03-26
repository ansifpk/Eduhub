import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async() =>{
   try {
     await mongoose.connect(process.env.MONGO_URL!).then(()=>console.log("mongodb for message service Succesfully connected"));
     
   } catch (error) {
     console.error(error);
   }
}