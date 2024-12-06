import express from 'express';
import { connectDB } from './framWorks/webServer/config/config';
import cors from 'cors';
import { json } from 'express';
import { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import { AdminRouter } from './framWorks/webServer/routes/adminRouter';
import { InstructorRouter } from './framWorks/webServer/routes/instructorRouter';
import { UserRouter } from './framWorks/webServer/routes/userRouter';
import { errMiddleware } from './useCases/middlewares/errorMiddleware';
import kafkaWrapper from './framWorks/webServer/config/kafka/kafkaWrapper';
// import { UserCreatedConsumer } from './framWorks/webServer/config/kafka/consumer/user-created-consumer';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { UserProfileCreateConsumer } from './framWorks/webServer/config/kafka/consumer/user-created-consumer';
import { OrderCreatedCreateConsumer } from './framWorks/webServer/config/kafka/consumer/order-created-consumer';
import { UserBlockedConsumer } from './framWorks/webServer/config/kafka/consumer/user-block-consumer';
dotenv.config();

async function start(){
    try {
        
        await kafkaWrapper.connect();       
        const consumer = await kafkaWrapper.createConsumer('course-user-profile-created-group')
        const consumer2 = await kafkaWrapper.createConsumer("course-order-created-group")
         const consumer3  = await kafkaWrapper.createConsumer("course-user-blocked-group")
        consumer.connect();
        consumer2.connect();
        consumer3.connect();
        console.log("consumer connect suuccessfully");
       const listener = new UserProfileCreateConsumer(consumer)
       const listener2 = new OrderCreatedCreateConsumer(consumer2)
        await new UserBlockedConsumer(consumer3).listen()
       await listener.listen()
       await listener2.listen()
       await connectDB();
       app.listen(3002, () => console.log("the server is running in http://localhost:3002 for course"))
    } catch (error) {
        console.error(error)
    }
    
}


const app = express();

app.use(cors({credentials:true,origin:["http://client-srv:5173",'http://eduhub.dev']}));
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(cookieSession({
    signed:false,
    secure:false,
}))

const adminRoute = express.Router();
const instructorRoute = express.Router();
const userRouter = express.Router();

AdminRouter(adminRoute)
InstructorRouter(instructorRoute);
UserRouter(userRouter);

app.use("/course/admin",adminRoute)
app.use("/course/instructor",instructorRoute)
app.use("/course/user",userRouter)
app.use(errMiddleware);
start();
