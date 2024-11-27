import express from 'express';
import {json,urlencoded} from 'body-parser'
// import { connectDB } from './framework/webServer/config/mongoDB/db';
// import { UserRoute } from './framework/webServer/routes/userRoute';
import cors from 'cors';
// import { errMiddleware } from './useCase/middlewares/errorMiddleware';
// import { AdminRoute } from './framework/webServer/routes/adminRoute';
// import { InstructorRouter } from './framework/webServer/routes/instructorRouter';
// import kafkaWrapper from './framework/webServer/config/kafka/kafkaWrapper';
import cookieParser from   'cookie-parser'
// import 
// connectDB();
const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
// UserRoute(userRouter);
// AdminRoute(adminRouter);
// InstructorRouter(instructorRouter);

app.use(cors({origin:'http://localhost:5173',credentials:true}))


app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))

// Apply the separate routers to different paths
// app.use('/user',userRouter);
// app.use('/admin',adminRouter);
// app.use('/instructor',instructorRouter);

// app.use(errMiddleware);

const start = async () => {
    try {
        // await kafkaWrapper.connect();
        app.listen(3004, () => console.log("the server is running in http://localhost:3004 for user"))
    } catch (error) {
        console.error(error);
    }
}
start()