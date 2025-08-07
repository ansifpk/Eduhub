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


app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({credentials:true,
  origin: process.env.NODE_ENV === 'production'
    ? ['https://www.eduhublearning.online',"https://eduhub-s2po.vercel.app"]
    : ['http://client-srv:5173', 'http://localhost:5173']
}));

app.use(cookieParser())

app.use("/category/admin",categoryRouter)
app.use("/category/instructor",instructorRoute)
app.all("*",(req,res)=>{
   throw new NotFoundError("Path Not Found.")
})
app.use(errorHandler as any);
app.listen(process.env.PORT,()=>console.log(`catecory server running ${process.env.PORT} port`))