import express from 'express';
import { json,urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './framework/webServer/config/db';
import { CategoryRoute } from './framework/webServer/routes/categoryRoute';
import { errMiddleware } from './useCase/middlewares/errorMiddleware';
import { InstructorRouter } from './framework/webServer/routes/instructorRoute';
connectDB()
const app = express();

const categoryRouter = express.Router()
const instructorRoute = express.Router()

CategoryRoute(categoryRouter)
InstructorRouter(instructorRoute)


app.use(json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.use(cors({origin:'http://localhost:5173',credentials:true}))

app.use("/admin",categoryRouter)
app.use("/instructor",instructorRoute)
app.use(errMiddleware);
app.listen(3001,()=>console.log("catecory server running 3001 port"))