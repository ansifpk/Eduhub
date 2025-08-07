import express from 'express';
import cors from 'cors';
import { UserRouter } from './framwork/webServer/routes/userRouter';
import { connectDB } from './framwork/webServer/config/mongoDB/db';
import kafkaWrapper from './framwork/webServer/config/kafka/kafkaWrapper';
import { UserCreatedConsumer } from './framwork/webServer/config/kafka/consumer/user-created-consumer';
import { InstructorRouter } from './framwork/webServer/routes/instructorRouter';
import { AdminRouter } from './framwork/webServer/routes/adminRouter';
import bodyParser from 'body-parser';
import { UserBlockedConsumer } from './framwork/webServer/config/kafka/consumer/user-block-consumer';
import { CourseCreatedConsumer } from './framwork/webServer/config/kafka/consumer/course-created-consumer';
import { CourseListedConsumer } from './framwork/webServer/config/kafka/consumer/course-listed-consumer';
import { CourseUpdatedConsumer } from './framwork/webServer/config/kafka/consumer/course-updated-consumer';
import { OrderCreatedCreateConsumer } from './framwork/webServer/config/kafka/consumer/order-created-consumer';
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import cookieParser from 'cookie-parser';

const app = express()
app.set('trust proxy',true);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors({credentials:true,
    origin: process.env.NODE_ENV === 'production'
      ? ['https://www.eduhublearning.online',"https://eduhub-s2po.vercel.app"]
      : ['http://client-srv:5173', 'http://localhost:5173']
    }));
app.use(cookieParser());

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
UserRouter(userRouter);
AdminRouter(adminRouter);
InstructorRouter(instructorRouter);
app.use((req,res,next)=>{
    console.log("cokiees",req.cookies);
})
// Apply the separate routers to different paths
app.use('/profile/user',userRouter);
app.use('/profile/admin',adminRouter);
app.use('/profile/instructor',instructorRouter);
app.use("*",(req,res)=>{
    throw new NotFoundError("Path Not Found.") 
})
app.use(errorHandler as any);

const start = async () => {
    try {
       
    //     await kafkaWrapper.connect();
    //     const userCreatedConsumer = await kafkaWrapper.createConsumer('profile-user-created-group')
    //     const userBlockedConsumer = await kafkaWrapper.createConsumer('profile-user-blocked-group')
    // const consumerCourse = await kafkaWrapper.createConsumer("profile-course-created-group")
    // const consumerCourseUpdated = await kafkaWrapper.createConsumer("profile-course-updated-group")
    // const consumerCourseListed = await kafkaWrapper.createConsumer("profile-course-listed-group")
    // const consumer = await kafkaWrapper.createConsumer("profile-order-created-group")
    // consumer.connect()
    // consumerCourse.connect()
    // consumerCourseUpdated.connect()
    // consumerCourseListed.connect()
    //     userCreatedConsumer.connect();
    //     userBlockedConsumer.connect();
    //     console.log("consumer connect suuccessfully");
    //    const listener = new UserCreatedConsumer(userCreatedConsumer)
    //    await listener.listen();
    //    const listener2 =  new UserBlockedConsumer(userBlockedConsumer)
    //    await listener2.listen();
    //      await new CourseCreatedConsumer(consumerCourse).listen();
    //      await new CourseListedConsumer(consumerCourseUpdated).listen();
    //      await new CourseUpdatedConsumer(consumerCourseListed).listen();
    //      await new OrderCreatedCreateConsumer(consumer).listen();
       await connectDB();
        app.listen(3004, () => console.log("the server is running in http://localhost:3004 for profile!!!!!!!!"))
    } catch (error) {
        console.error(error);
    }
}
start()