import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MoNGO_URL!).then(()=>console.log("profile service mongodb connected successfully...!"))
        .catch((err)=>{
            console.error(err);
        })        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
export {connectDB}