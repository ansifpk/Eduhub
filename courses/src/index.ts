import express from "express";
import { connectDB } from "./framWorks/webServer/config/config";
import cors from "cors";
import { AdminRouter } from "./framWorks/webServer/routes/adminRouter";
import { InstructorRouter } from "./framWorks/webServer/routes/instructorRouter";
import { UserRouter } from "./framWorks/webServer/routes/userRouter";
import kafkaWrapper from "./framWorks/webServer/config/kafka/kafkaWrapper";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { UserProfileCreateConsumer } from "./framWorks/webServer/config/kafka/consumer/user-profile-created-consumer";
import { OrderCreatedCreateConsumer } from "./framWorks/webServer/config/kafka/consumer/order-created-consumer";
import { UserBlockedConsumer } from "./framWorks/webServer/config/kafka/consumer/user-block-consumer";
import { InstructorAprovedConsumer } from "./framWorks/webServer/config/kafka/consumer/instructor-approved-consumer";
import { EmailChangedConsumer } from "./framWorks/webServer/config/kafka/consumer/email-changed-consumer";
import { CouponUsedConsumer } from "./framWorks/webServer/config/kafka/consumer/coupon-used-consumer";
import { UserProfileUpdatedConsumer } from "./framWorks/webServer/config/kafka/consumer/user-profile-updated-consumer";
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import cookieParser from "cookie-parser";
import { ProfilePictureUpdatedConsumer } from "./framWorks/webServer/config/kafka/consumer/picture-updated-consumer";
dotenv.config();

async function start() {
  try {
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

    await connectDB();
    app.listen(process.env.PORT, () =>
      console.log(`the server is running in ${process.env.PORT} for course`)
    );
  } catch (error) {
    console.error(error);
  }
}

const app = express();
app.use(cookieParser());
app.set("trust proxy", true);
const allowedOrgins = JSON.parse(process.env.ORGINS!);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ credentials: true, origin: allowedOrgins }));

const adminRoute = express.Router();
const instructorRoute = express.Router();
const userRouter = express.Router();

AdminRouter(adminRoute);
InstructorRouter(instructorRoute);
UserRouter(userRouter);

app.use("/course/admin", adminRoute);
app.use("/course/instructor", instructorRoute);
app.use("/course/user", userRouter);
app.use("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);
start();
