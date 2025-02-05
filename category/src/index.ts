import express from 'express';
import { json,urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './framework/webServer/config/db';
import { CategoryRoute } from './framework/webServer/routes/categoryRoute';
import { InstructorRouter } from './framework/webServer/routes/instructorRoute';
import cookieSession from 'cookie-session';
import { errMiddleware } from '@eduhublearning/common';
dotenv.config()
connectDB()
const app = express();

const categoryRouter = express.Router()
const instructorRoute = express.Router()

CategoryRoute(categoryRouter)
InstructorRouter(instructorRoute)


app.use(json())
// app.use(cookieParser())
app.use(cors({credentials:true,
  origin: process.env.NODE_ENV === 'production'
    ? 'https://www.eduhublearning.online'
    : ['http://client-srv:5173', 'http://localhost:5173']
  ,methods: ['GET', 'POST'],}));
// app.use(cors({credentials:true,origin:["http://localhost:5173",'https://www.eduhublearning.online']}));

app.use(
  cookieSession({
      signed: false, 
      httpOnly: true, 
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', 
      secure: process.env.NODE_ENV === 'production', 
    })
)
// app.use()
app.use(urlencoded({ extended: true }))
// app.use(cors({credentials:true,origin:["http://localhost:5173",'http://eduhub.dev']}))

app.use("/category/admin",categoryRouter)
app.use("/category/instructor",instructorRoute)
app.use(errMiddleware);
app.listen(process.env.PORT,()=>console.log(`catecory server running ${process.env.PORT} port`))