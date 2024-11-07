import express from 'express';
import {json,urlencoded} from 'body-parser'
import { connectDB } from './framework/webServer/config/db';
import { UserRoute } from './framework/webServer/routes/userRoute';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errMiddleware } from './useCase/middlewares/errorMiddleware';
import { AdminRoute } from './framework/webServer/routes/adminRoute';
import { InstructorRouter } from './framework/webServer/routes/instructorRouter';
connectDB()
const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
UserRoute(userRouter);
AdminRoute(adminRouter);
InstructorRouter(instructorRouter);

app.use(cors())
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

// Apply the separate routers to different paths
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/instructor',instructorRouter);

app.use(errMiddleware);

app.listen(3000, () => console.log("the server is running in http://localhost:3000 for auth"))