import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        .then(()=>console.log("mongodb connected successfully...."))
        .catch((err)=>{
            console.log("mongodb connection failed")
        })
    } catch (error) {
        console.error(error);
    }
}