import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from   'cookie-parser';
import { UserRouter } from './framwork/webServer/routes/userRouter';
import { connectDB } from './framwork/webServer/config/mongoDB/db';
import kafkaWrapper from './framwork/webServer/config/kafka/kafkaWrapper';
import { UserCreatedConsumer } from './framwork/webServer/config/kafka/consumer/user-created-consumer';
import { InstructorRouter } from './framwork/webServer/routes/instructorRouter';
import { errMiddleware } from './useCases/middlewares/errorMiddleware';
import { AdminRouter } from './framwork/webServer/routes/adminRouter';

connectDB();
const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
UserRouter(userRouter);
AdminRouter(adminRouter);
InstructorRouter(instructorRouter);

app.use(cors({origin:'http://localhost:5173',credentials:true}))


app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

// Apply the separate routers to different paths
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/instructor',instructorRouter);

app.use(errMiddleware);

const start = async () => {
    try {
        await kafkaWrapper.connect();

        const consumer = await kafkaWrapper.createConsumer('user-user-created-group')
        consumer.connect();
        console.log("consumer connect suuccessfully");
       const listener = new UserCreatedConsumer(consumer)
       await listener.listen();
       
        app.listen(3004, () => console.log("the server is running in http://localhost:3004 for user"))
    } catch (error) {
        console.error(error);
    }
}
start()