import express from 'express';
import {json,urlencoded} from 'body-parser'
import { connectDB } from './framework/webServer/config/mongoDB/db';
import { UserRoute } from './framework/webServer/routes/userRoute';
import cors from 'cors';
import { errMiddleware } from './useCase/middlewares/errorMiddleware';
import { AdminRoute } from './framework/webServer/routes/adminRoute';
import { InstructorRouter } from './framework/webServer/routes/instructorRouter';
import kafkaWrapper from './framework/webServer/config/kafka/kafkaWrapper';
import cookieParser from   'cookie-parser'
import { InstructorAprovalConsumer } from './framework/webServer/config/kafka/consumer/instructor-approvel-consumer';
connectDB();
const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
UserRoute(userRouter);
AdminRoute(adminRouter);
InstructorRouter(instructorRouter);

app.use(cors({origin:'http://localhost:5173',credentials:true}))


app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

// Apply the separate routers to different paths
app.use('/auth/user',userRouter);
app.use('/auth/admin',adminRouter);
app.use('/auth/instructor',instructorRouter);

app.use(errMiddleware);

const start = async () => {
    try {
        await kafkaWrapper.connect();
        const consumer = await kafkaWrapper.createConsumer("order-instructor-aproval-group")
        consumer.connect()
        const listener = new InstructorAprovalConsumer(consumer)
        await listener.listen();
        app.listen(3000, () => console.log("the server is running in http://localhost:3000/auth for auth"))
    } catch (error) {
        console.error(error);
    }
}
start()
