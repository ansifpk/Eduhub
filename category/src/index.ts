import express from 'express';
import { json,urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './framework/webServer/config/db';
import { CategoryRoute } from './framework/webServer/routes/categoryRoute';
import { InstructorRouter } from './framework/webServer/routes/instructorRoute';
import {  errorHandler, NotFoundError } from '@eduhublearning/common';
import cookieParser from 'cookie-parser';

dotenv.config()
connectDB()
const app = express();
app.set('trust proxy',true);
const categoryRouter = express.Router()
const instructorRoute = express.Router()
CategoryRoute(categoryRouter)
InstructorRouter(instructorRoute)

const allowedOrgins =  JSON.parse(process.env.ORGINS!)


app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({credentials:true,
  origin: allowedOrgins
}));

app.use(cookieParser())

app.use("/category/admin",categoryRouter)
app.use("/category/instructor",instructorRoute)
app.all("*",(req,res)=>{
   throw new NotFoundError("Path Not Found.")
})
app.use(errorHandler as any);
app.listen(process.env.PORT,()=>console.log(`catecory server running ${process.env.PORT} port`))