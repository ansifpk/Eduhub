import { connectDB } from "./framwork/webServer/config/config";
import express, { json, urlencoded } from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";
import { UserRouter } from "./framwork/webServer/router/userRouter";
import { InstructorRouter } from "./framwork/webServer/router/instructorRouter";
import kafkaWrapper from "./framwork/webServer/config/kafka/kafkaWrapper";
import { CourseCreatedConsumer } from "./framwork/webServer/config/kafka/consumer/course-created-consumer";
import { UserProfileCreatedConsumer } from "./framwork/webServer/config/kafka/consumer/user-profile-created-consumer";


async function start(){
    try {
       connectDB();
       await kafkaWrapper.connect()
      const consumerUser = await kafkaWrapper.createConsumer("order-user-profile-created-group")
      const consumerCourse = await kafkaWrapper.createConsumer("order-course-created-group")
       consumerUser.connect();
       consumerCourse.connect();
       const listener = new UserProfileCreatedConsumer(consumerUser)
       const listenerCourse = new CourseCreatedConsumer(consumerCourse)
       await listener.listen()
       await listenerCourse.listen()
    } catch (error) {
        console.error(error)
    }
    
}
start();

const app = express();

app.use(cors())
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

const userRouter = express.Router();
const instructorRouter = express.Router();

UserRouter(userRouter);
InstructorRouter(instructorRouter);

app.use("/user",userRouter)
app.use("/instructor",instructorRouter)
// app.use(errMiddleware);

app.listen(3003,()=>console.log("running at 3003"))