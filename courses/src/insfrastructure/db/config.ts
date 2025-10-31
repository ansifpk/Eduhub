import mongoose from "mongoose";


export const connectDB = async () => {
    try {        
        await mongoose.connect(process.env.MONGO_URL!)
        .then(()=>console.log("course service database connected successfully...!"))
        .catch(err => console.error('MongoDB connection error:', err));
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
