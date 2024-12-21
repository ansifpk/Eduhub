import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pkansif39:ansifpk123@eduhub.y1e7f.mongodb.net/message?retryWrites=true&w=majority&appName=EduHub")
        console.log("connect mongodb")
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
export {connectDB}