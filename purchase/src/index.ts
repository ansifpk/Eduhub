import { connectDB } from "./framwork/webServer/config/config";
import express, { json, urlencoded } from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";
import cookieSession from 'cookie-session'
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

async function start(){
    try {
       await kafkaWrapper.connect()
      const consumerUser = await kafkaWrapper.createConsumer("purchase-user-profile-created-group")
      const consumerCourse = await kafkaWrapper.createConsumer("purchase-course-created-group")
      const consumerCourseUpdated = await kafkaWrapper.createConsumer("purchase-course-updated-group")
      const consumerCourseListed = await kafkaWrapper.createConsumer("purchase-course-listed-group")
      const consumerInstructor = await kafkaWrapper.createConsumer("purchase-instructor-approved-group")
      const consumerBlock = await kafkaWrapper.createConsumer("purchase-user-blocked-group")
      const consumer1 = await kafkaWrapper.createConsumer("purchase-email-changed-group")
       consumerUser.connect();
       consumerCourse.connect();
       consumerCourseUpdated.connect();
       consumerInstructor.connect();
       consumerCourseListed.connect();
       consumerBlock.connect();
       consumer1.connect();
       const listener = new UserProfileCreatedConsumer(consumerUser)
       const listenerCourse = new CourseCreatedConsumer(consumerCourse)
       const listenerCourseUpdated = new CourseUpdatedConsumer(consumerCourseUpdated)
       const listenerCourseListed = new CourseListedConsumer(consumerCourseListed)
       const listenerInstructor = new InstructorAprovedConsumer(consumerInstructor)
       const blockUser = new UserBlockedConsumer(consumerBlock)
       await new EmailChangedConsumer(consumer1).listen();
       await listener.listen()
       await listenerCourse.listen()
       await listenerCourseUpdated.listen()
       await listenerCourseListed.listen()
       await listenerInstructor.listen()
       await blockUser.listen()
       await connectDB();
       app.listen(3003,()=>console.log("purchase service running at localhost:3003 !!!!!"))
    } catch (error) {
        console.error(error)
    }
    
}


const app = express();
app.use(cookieSession({
    signed:false,
    secure:false,
}))
app.use(cors({credentials:true,origin:["http://localhost:5173",'http://eduhub.dev']}))
app.use(json())
app.use(urlencoded({extended:true}))
// app.use(cookieParser())

const userRouter = express.Router();
const instructorRouter = express.Router();

UserRouter(userRouter);
InstructorRouter(instructorRouter);

app.use("/purchase/user",userRouter)
app.use("/purchase/instructor",instructorRouter)
// app.use(errMiddleware);

start();