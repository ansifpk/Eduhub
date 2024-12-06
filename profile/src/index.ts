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
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import { UserBlockedConsumer } from './framwork/webServer/config/kafka/consumer/user-block-consumer';
const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
UserRouter(userRouter);
AdminRouter(adminRouter);
InstructorRouter(instructorRouter);

app.use(cors({credentials:true,origin:["http://client-srv:5173",'http://eduhub.dev'],allowedHeaders:["*"]}));


// app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Apply the separate routers to different paths
app.use('/profile/user',userRouter);
app.use('/profile/admin',adminRouter);
app.use('/profile/instructor',instructorRouter);

app.use(errMiddleware);

const start = async () => {
    try {
       
        await kafkaWrapper.connect();
        const userCreatedConsumer = await kafkaWrapper.createConsumer('profile-user-created-group')
        const userBlockedConsumer = await kafkaWrapper.createConsumer('profile-user-blocked-group')
        userCreatedConsumer.connect();
        userBlockedConsumer.connect();
        console.log("consumer connect suuccessfully");
       const listener = new UserCreatedConsumer(userCreatedConsumer)
       await listener.listen();
       const listener2 =  new UserBlockedConsumer(userBlockedConsumer)
       await listener2.listen()
       await connectDB();
        app.listen(3004, () => console.log("the server is running in http://localhost:3004 for profile!!!!!!!!"))
    } catch (error) {
        console.error(error);
    }
}
start()