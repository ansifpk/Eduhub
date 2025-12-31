import dotenv from 'dotenv';
import { app } from './app';
import { connectDB } from './infrastructure/db/models/config';
dotenv.config();

const start = async()=>{
    console.log("hi This From auth/Index.ys");
    try {
        await connectDB();
        console.log("connected to mongodb");
    } catch (err) {
         console.error(err)
    }
    
    app.listen(3000,()=>console.log("3000 running"))
};

start();