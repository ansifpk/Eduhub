import { connectDB } from "./framwork/webServer/config/config";
import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { UserRouter } from "./framwork/webServer/router/userRouter";
import { InstructorRouter } from "./framwork/webServer/router/instructorRouter";
import kafkaWrapper from "./framwork/webServer/config/kafka/kafkaWrapper";
import { CourseCreatedConsumer } from "./framwork/webServer/config/kafka/consumer/course-created-consumer";
import { UserProfileCreatedConsumer } from "./framwork/webServer/config/kafka/consumer/user-profile-created-consumer";
import { UserBlockedConsumer } from "./framwork/webServer/config/kafka/consumer/user-block-consumer";
import { CourseUpdatedConsumer } from "./framwork/webServer/config/kafka/consumer/course-updated-consumer";
import { CourseListedConsumer } from "./framwork/webServer/config/kafka/consumer/course-listed-consumer";
import { InstructorAprovedConsumer } from "./framwork/webServer/config/kafka/consumer/instructor-approved-consumer";
import { EmailChangedConsumer } from "./framwork/webServer/config/kafka/consumer/email-changed-consumer";
import { webHookRouter } from "./framwork/webServer/router/webHookRouter";
import { UserProfileUpdatedConsumer } from "./framwork/webServer/config/kafka/consumer/user-profile-updated-consumer";
import { AdminRouter } from "./framwork/webServer/router/adminRouter";
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import cookieParser from "cookie-parser";
import { ProfilePictureUpdatedConsumer } from "./framwork/webServer/config/kafka/consumer/picture-updated-consumer";

async function start() {
  try {
      //  await kafkaWrapper.connect()
      // const consumerUser = await kafkaWrapper.createConsumer("purchase-user-profile-created-group")
      // const consumerCourse = await kafkaWrapper.createConsumer("purchase-course-created-group")
      // const consumerCourseUpdated = await kafkaWrapper.createConsumer("purchase-course-updated-group")
      // const consumerCourseListed = await kafkaWrapper.createConsumer("purchase-course-listed-group")
      // const consumerInstructor = await kafkaWrapper.createConsumer("purchase-instructor-approved-group")
      // const consumerBlock = await kafkaWrapper.createConsumer("purchase-user-blocked-group")
      // const consumer1 = await kafkaWrapper.createConsumer("purchase-email-changed-group")
      // const consumer2 = await kafkaWrapper.createConsumer("purchase-profile-updated-group")
      // const pictureUpdatedConsumer = await kafkaWrapper.createConsumer("profile-picture-updated-group")
      //  consumerUser.connect();
      //  consumerCourse.connect();
      //  consumerCourseUpdated.connect();
      //  consumerInstructor.connect();
      //  consumerCourseListed.connect();
      //  consumerBlock.connect();
      //  consumer1.connect();
      //  consumer2.connect();
      //  pictureUpdatedConsumer.connect();
      //  const listener = new UserProfileCreatedConsumer(consumerUser)
      //  const listenerCourse = new CourseCreatedConsumer(consumerCourse)
      //  const listenerCourseUpdated = new CourseUpdatedConsumer(consumerCourseUpdated)
      //  const listenerCourseListed = new CourseListedConsumer(consumerCourseListed)
      //  const listenerInstructor = new InstructorAprovedConsumer(consumerInstructor)
      //  const blockUser = new UserBlockedConsumer(consumerBlock)
      //  const pictureUpdatedListener = new ProfilePictureUpdatedConsumer(pictureUpdatedConsumer)
      //  await new EmailChangedConsumer(consumer1).listen();
      //  await new UserProfileUpdatedConsumer(consumer2).listen();
      //  await listener.listen()
      //  await listenerCourse.listen()
      //  await listenerCourseUpdated.listen()
      //  await listenerCourseListed.listen()
      //  await listenerInstructor.listen()
      //  await blockUser.listen()
      //  await pictureUpdatedListener.listen()
       await connectDB();
       app.listen(process.env.PORT, () =>
        console.log(`purchase service running at localhost:${process.env.PORT} !!!!!`)
       );
  } catch (error) {
    console.error(error);
  }
}

const app = express();
app.set("trust proxy", true);

const allowedOrgins = JSON.parse(process.env.ORGINS!);
app.use(cors({ credentials: true, origin: allowedOrgins }));

app.use(cookieParser());
const webHook = express.Router();

//! its placed here other wise the express.raw will not works for webHook
webHookRouter(webHook);
app.use("/purchase/webHook", webHook);

app.use(json());
app.use(urlencoded({ extended: true }));

const userRouter = express.Router();
const instructorRouter = express.Router();
const adminRouter = express.Router();

UserRouter(userRouter);
InstructorRouter(instructorRouter);
AdminRouter(adminRouter);

app.use("/purchase/user", userRouter);
app.use("/purchase/instructor", instructorRouter);
app.use("/purchase/admin", adminRouter);
app.use("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);

start();
