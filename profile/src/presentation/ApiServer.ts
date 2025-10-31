
import express from 'express';
import { connectDB } from '../infrastructure/db/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import { userRouter } from './routes/userRouter';
import { instructorRouter } from './routes/instructorRouter';
import { adminRouter } from './routes/adminRouter';
import { EmailChangedConsumer } from '../infrastructure/kafka/consumer/email-changed-consumer';
import kafkaWrapper from '../infrastructure/kafka/kafkaWrapper';
import { CourseCreatedConsumer } from '../infrastructure/kafka/consumer/course-created-consumer';
import { CourseListedConsumer } from '../infrastructure/kafka/consumer/course-listed-consumer';
import { CourseUpdatedConsumer } from '../infrastructure/kafka/consumer/course-updated-consumer';
import { OrderCreatedCreateConsumer } from '../infrastructure/kafka/consumer/order-created-consumer';
import { UserBlockedConsumer } from '../infrastructure/kafka/consumer/user-block-consumer';
import { UserCreatedConsumer } from '../infrastructure/kafka/consumer/user-created-consumer';

export class ApiServer {
    
    public  static async run(port:number):Promise<void>{
       const app = express();
       app.set("trust proxy", true);
       app.use(express.json({ limit: "50mb" }));
       app.use(express.urlencoded({ limit: "50mb", extended: true }));
       
       const allowedOrgins = JSON.parse(process.env.ORGINS!);
       app.use(cors({ credentials: true, origin: allowedOrgins }));
       
       app.use(cookieParser());

       app.use("/profile/user", userRouter);
       app.use("/profile/admin", adminRouter);
       app.use("/profile/instructor", instructorRouter);
       app.use("*", (req, res) => {
         throw new NotFoundError("Path Not Found.");
       });
       app.use(errorHandler as any);
       
    //    await kafkaWrapper.connect();
    // const userCreatedConsumer = await kafkaWrapper.createConsumer(
    //   "profile-user-created-group"
    // );
    // const userBlockedConsumer = await kafkaWrapper.createConsumer(
    //   "profile-user-blocked-group"
    // );
    // const consumerCourse = await kafkaWrapper.createConsumer(
    //   "profile-course-created-group"
    // );
    // const consumerCourseUpdated = await kafkaWrapper.createConsumer(
    //   "profile-course-updated-group"
    // );
    // const consumerCourseListed = await kafkaWrapper.createConsumer(
    //   "profile-course-listed-group"
    // );
    // const consumer = await kafkaWrapper.createConsumer(
    //   "profile-order-created-group"
    // );
    // const emailChangeConsumer = await kafkaWrapper.createConsumer(
    //   "profile-email-changed-group"
    // );
    // consumer.connect();
    // consumerCourse.connect();
    // consumerCourseUpdated.connect();
    // consumerCourseListed.connect();
    // userCreatedConsumer.connect();
    // userBlockedConsumer.connect();
    // emailChangeConsumer.connect();
    // const listener = new UserCreatedConsumer(userCreatedConsumer);
    // await listener.listen();
    // const listener2 = new UserBlockedConsumer(userBlockedConsumer);
    // await listener2.listen();
    // await new CourseCreatedConsumer(consumerCourse).listen();
    // await new CourseListedConsumer(consumerCourseUpdated).listen();
    // await new CourseUpdatedConsumer(consumerCourseListed).listen();
    // await new OrderCreatedCreateConsumer(consumer).listen();
    // await new EmailChangedConsumer(emailChangeConsumer).listen();
    await connectDB();
       app.listen(port,()=>console.log(`profile service start running on ${port}...!`))
    }
}