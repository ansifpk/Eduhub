import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
// import { UserRouter } from './framwork/webServer/routes/userRouter';
import { connectDB } from './framwork/webServer/config/mongoDB/db';
import kafkaWrapper from './framwork/webServer/config/kafka/kafkaWrapper';
import { UserProfileCreatedConsumer } from './framwork/webServer/config/kafka/consumer/user-profile-created-consumer';
import { Producer } from 'kafkajs';
import { InstructorAprovalConsumer } from './framwork/webServer/config/kafka/consumer/instructor-approved-consumer';
import { UserBlockedConsumer } from './framwork/webServer/config/kafka/consumer/user-block-consumer';
import { MessageRoute } from './framwork/webServer/routers/messageRouter';
import { ChatRoute } from './framwork/webServer/routers/chatRoute';
// import { errMiddleware } from './useCases/middlewares/errorMiddleware';
// import { AdminRouter } from './framwork/webServer/routes/adminRouter';
dotenv.config();
const PORT = process.env.PORT
const app = express()

// Separate routers for user and admin
const messageRouter = express.Router()
const chatRouter = express.Router()


// Set up routes on the separate routers
MessageRoute(messageRouter);
ChatRoute(chatRouter);


app.use(cors({credentials:true,origin:["http://localhost:5173",'http://eduhub.dev']}));


app.use(cookieSession({
    signed:false,
    secure:false,
}))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Apply the separate routers to different paths
app.use('/message/chat',chatRouter);
app.use('/message/message',messageRouter);

// app.use(errMiddleware);

const start = async () => {
    try {
        await connectDB();

        await kafkaWrapper.connect();
        const userCreatedConsumer = await kafkaWrapper.createConsumer('message-user-created-group')
        const consumser = await kafkaWrapper.createConsumer('message-instructor-approved-group')
        const consumser2 = await kafkaWrapper.createConsumer('message-user-blocked-group')
        userCreatedConsumer.connect();
        consumser.connect();
        consumser2.connect();
        const listener1 = new UserProfileCreatedConsumer(userCreatedConsumer)
        const listener2 = new InstructorAprovalConsumer(consumser)
        const listener3 = new UserBlockedConsumer(consumser2)
        await listener1.listen();
        await listener2.listen();
        await listener3.listen();
        
        app.listen(PORT, () => console.log(`the Message server is running in http://localhost:${PORT} for message!!!!!!!!`))
    } catch (error) {
        console.error(error);
    }
}
start()