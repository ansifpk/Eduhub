import express from 'express';
import cors from 'cors';
import { connectDB } from '../insfrastructure/db/config';
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import { adminRoute } from './routes/adminRouter';
import { instructorRoute } from './routes/instructorRoute';
import { userRoute } from './routes/userRoute';
import { CouponUsedConsumer } from '../insfrastructure/kafka/consumer/coupon-used-consumer';
import { EmailChangedConsumer } from '../insfrastructure/kafka/consumer/email-changed-consumer';
import { InstructorAprovedConsumer } from '../insfrastructure/kafka/consumer/instructor-approved-consumer';
import { OrderCreatedCreateConsumer } from '../insfrastructure/kafka/consumer/order-created-consumer';
import { ProfilePictureUpdatedConsumer } from '../insfrastructure/kafka/consumer/picture-updated-consumer';
import { UserBlockedConsumer } from '../insfrastructure/kafka/consumer/user-block-consumer';
import { UserProfileCreateConsumer } from '../insfrastructure/kafka/consumer/user-profile-created-consumer';
import { UserProfileUpdatedConsumer } from '../insfrastructure/kafka/consumer/user-profile-updated-consumer';
import kafkaWrapper from '../insfrastructure/kafka/kafkaWrapper';
const app = express()
export class ApiServer{
 
    public static async run(port:number) {
        app.use(cookieParser());
        app.set("trust proxy", true);
        const allowedOrgins = JSON.parse(process.env.ORGINS!);
        
        app.use(express.json({ limit: "50mb" }));
        app.use(express.urlencoded({ limit: "50mb", extended: true }));
        app.use(cors({ credentials: true, origin: allowedOrgins }));

        await connectDB();
        await kafkaWrapper.connect();
    const consumer = await kafkaWrapper.createConsumer(
      "course-user-profile-created-group"
    );
    const consumer2 = await kafkaWrapper.createConsumer(
      "course-order-created-group"
    );
    const consumer3 = await kafkaWrapper.createConsumer(
      "course-user-blocked-group"
    );
    const instructorApproved = await kafkaWrapper.createConsumer(
      "course-instructor-approved-group"
    );
    const consumer4 = await kafkaWrapper.createConsumer(
      "course-email-changed-group"
    );
    const consumer5 = await kafkaWrapper.createConsumer(
      "course-coupon-used-group"
    );
    const consumer6 = await kafkaWrapper.createConsumer(
      "course-profile-updated-group"
    );
    const pictureUpdatedConsumer = await kafkaWrapper.createConsumer(
      "profile-picture-updated-group"
    );

    consumer.connect();
    consumer2.connect();
    instructorApproved.connect();
    consumer3.connect();
    consumer4.connect();
    consumer5.connect();
    consumer6.connect();
    pictureUpdatedConsumer.connect();
    await new UserProfileCreateConsumer(consumer).listen();
    await new OrderCreatedCreateConsumer(consumer2).listen();
    await new InstructorAprovedConsumer(instructorApproved).listen();
    await new UserBlockedConsumer(consumer3).listen();
    await new EmailChangedConsumer(consumer4).listen();
    await new CouponUsedConsumer(consumer5).listen();
    await new UserProfileUpdatedConsumer(consumer6).listen();
    await new ProfilePictureUpdatedConsumer(pictureUpdatedConsumer).listen();
    
        app.use("/course/admin", adminRoute);
        app.use("/course/instructor", instructorRoute);
        app.use("/course/user", userRoute);
        app.use("*", (req, res) => {
          throw new NotFoundError("Path Not Found.");
        });
        app.use(errorHandler as any);

        app.listen(port,()=>console.log(`course service running at port ${port}`))
    }
}