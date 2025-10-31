import mongoose from "mongoose";



export const connectDB = async ()=>{
    try {
       mongoose.connect(process.env.MONGO_URL!).then(()=>console.log("Auth service mongodb connected"))        
    } catch (error) {
        console.error(error);
    }
}