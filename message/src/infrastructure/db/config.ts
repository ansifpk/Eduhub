import mongoose from "mongoose";

export const connectDB = async() =>{
   try {
     await mongoose.connect(process.env.MONGODB_URL!).then(()=>console.log("mongodb for message service Succesfully connected"));
     
   } catch (error) {
     console.error(error);
   }
}