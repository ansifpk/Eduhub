import express from  'express';
import cors from 'cors';
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import cookieParser from 'cookie-parser';
import { categoryRouter } from './routes/categoryRouter';
import { connectDB } from '../infrastructure/db/config';
import { instructorRouter } from './routes/instructorRouter';
const app  = express();

export class ApiServer {
 
    public static async run(port:number):Promise<void>{
        try {
            await connectDB()
            app.set('trust proxy',true);
            const allowedOrgins =  JSON.parse(process.env.ORGINS!)
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use(cors({credentials:true,
              origin: allowedOrgins
            }));

            app.use(cookieParser())
            
            app.use("/category/admin",categoryRouter)
            app.use("/category/instructor",instructorRouter)
            app.all("*",(req,res)=>{
               throw new NotFoundError("Path Not Found.")
            })
            app.use(errorHandler as any);

            app.listen(port,()=>console.log(`category server running on ${process.env.PORT}`))
        } catch (error) {
            console.error(error);
        }
    }
}