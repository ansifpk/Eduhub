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
dotenv.config();

async function start(){
    try {
        connectDB();
        await kafkaWrapper.connect();       
        const consumer = await kafkaWrapper.createConsumer('course-user-profile-created-group')
        const consumer2 = await kafkaWrapper.createConsumer('"course-order-created-group"')
        consumer.connect();
        consumer2.connect();
        console.log("consumer connect suuccessfully");
       const listener = new UserProfileCreateConsumer(consumer)
       const listener2 = new OrderCreatedCreateConsumer(consumer2)
       await listener.listen()
       await listener2.listen()
   
    } catch (error) {
        console.error(error)
    }
    
}
start();

const app = express();

app.use(cors({origin:'http://localhost:5173',credentials:true}))
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

app.use("/admin",adminRoute)
app.use("/instructor",instructorRoute)
app.use("/user",userRouter)
app.use(errMiddleware);

app.listen(process.env.PORT,()=>console.log("running at 3002"))