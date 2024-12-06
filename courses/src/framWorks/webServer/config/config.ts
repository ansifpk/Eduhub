import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pkansif39:ansifpk123@eduhub.y1e7f.mongodb.net/course?retryWrites=true&w=majority&appName=EduHub")
        .catch(err => console.error('MongoDB connection error:', err));
        console.log("connect mongodb")
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
export {connectDB}