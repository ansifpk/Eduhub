import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.set("debug",true)

const connectDB = async () => {
    try {

        await mongoose.connect("mongodb+srv://pkansif39:ansifpk123@eduhub.y1e7f.mongodb.net/category?retryWrites=true&w=majority&appName=EduHub")
        .catch(err => console.error('MongoDB connection error:', err));
        console.log("category connect mongodb")
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
export {connectDB}