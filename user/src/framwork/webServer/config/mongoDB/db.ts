import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/user')
        console.log("connect mongodb")
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
export {connectDB}