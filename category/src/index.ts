import express from 'express';
import { json,urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { connectDB } from './framework/webServer/config/db';
import { CategoryRoute } from './framework/webServer/routes/categoryRoute';
import { errMiddleware } from './useCase/middlewares/errorMiddleware';
import { InstructorRouter } from './framework/webServer/routes/instructorRoute';
import cookieSession from 'cookie-session';
dotenv.config()
connectDB()
const app = express();

const categoryRouter = express.Router()
const instructorRoute = express.Router()

CategoryRoute(categoryRouter)
InstructorRouter(instructorRoute)


app.use(json())
// app.use(cookieParser())
app.use(cookieSession({
    signed:false,
    secure:false
}))
// app.use()
app.use(urlencoded({ extended: true }))

app.use(cors({credentials:true,origin:["http://localhost:5173",'http://eduhub.dev']}))

app.use("/category/admin",categoryRouter)
app.use("/category/instructor",instructorRoute)
app.use(errMiddleware);
app.listen(process.env.PORT,()=>console.log(`catecory server running ${process.env.PORT} port`))