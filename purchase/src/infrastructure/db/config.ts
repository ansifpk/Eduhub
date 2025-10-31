import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        .then(()=>console.log('mongodb successfuyy connected for purchase service...!'))
    } catch (error) {
        console.error(error);
    }
}