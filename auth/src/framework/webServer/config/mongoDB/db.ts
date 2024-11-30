import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("connect mongodb")
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
export {connectDB}