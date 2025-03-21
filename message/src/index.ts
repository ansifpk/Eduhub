import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {createServer} from 'http';
import { connectDB } from './framwork/webServer/config/mongoDB/db';
import kafkaWrapper from './framwork/webServer/config/kafka/kafkaWrapper';
import { UserProfileCreatedConsumer } from './framwork/webServer/config/kafka/consumer/user-profile-created-consumer';
import { InstructorAprovalConsumer } from './framwork/webServer/config/kafka/consumer/instructor-approved-consumer';
import { UserBlockedConsumer } from './framwork/webServer/config/kafka/consumer/user-block-consumer';
import { MessageRoute } from './framwork/webServer/routers/messageRouter';
import { ChatRoute } from './framwork/webServer/routers/chatRoute';
import { Socket,Server } from 'socket.io';
import { UserProfileUpdatedConsumer } from './framwork/webServer/config/kafka/consumer/user-profile-updated-consumer';
import { NotificationRoute } from './framwork/webServer/routers/notificationRouter';
import { errorHandler } from '@eduhublearning/common';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT
const app = express();
app.set('trust proxy',true);
const httpServer = createServer(app);
// Separate routers for user and admin
const messageRouter = express.Router()
const chatRouter = express.Router()
const notificationRouter = express.Router()


// Set up routes on the separate routers
MessageRoute(messageRouter);
ChatRoute(chatRouter);
NotificationRoute(notificationRouter)




app.use(cors({credentials:true,
    origin: process.env.NODE_ENV === 'production'
      ? 'https://www.eduhublearning.online'
      : ['http://client-srv:5173', 'http://localhost:5173']
    ,methods: ['GET', 'POST','PATCH'],}));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(
//     cookieSession({
//         signed: false, 
//         httpOnly: true, 
//         sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', 
//         secure: process.env.NODE_ENV === 'production', 
//       })
// )
app.use(cookieParser())
// Apply the separate routers to different paths
app.use('/message/chat',chatRouter);
app.use('/message/message',messageRouter);
app.use('/message/notification',notificationRouter);
app.use(errorHandler as any);

//! web socket configurations
let onlineUsers:{userId:string,socketId:string}[] = [];

const io = new Server(httpServer,{
cors:{
    origin: ['http://client-srv:5173', 'http://localhost:5173',"https://www.eduhublearning.online"],
    methods: ["*"],
    credentials:true
},
  path: '/message/socket.io',
})

io.on("connect",(socket:Socket)=>{
    console.log("new connection in message srv",socket.id);
    
    //TODO listen connection
    socket.on("addNewUser",(userId:string)=>{
      console.log("message srv", userId)
    !onlineUsers.some((user)=>user.userId == userId)&&
      onlineUsers.push({
        userId,
        socketId:socket.id
      })

      io.emit("getOnlineUsers",onlineUsers)
    })

    //* add message
    socket.on("sendMessage",(message)=>{
       const user = onlineUsers.find((user)=>user.userId == message.recipientId);
       if(user){
        io.to(user.socketId).emit("getMessage",message);
        io.to(user.socketId).emit("getMessageNotification",{
            recipientId:message.recipientId,
            senderId:message.senderId,
            isRead:false,
            date:new Date()
        });
       }
    })

    //*disconnect user when
    socket.on("disconnect",()=>{
        onlineUsers = onlineUsers.filter((user)=>user.socketId !== socket.id)
        io.emit("getOnlineUsers",onlineUsers)
    })
})

const start = async () => {
    try {
      
        await kafkaWrapper.connect();
        const userCreatedConsumer = await kafkaWrapper.createConsumer('message-user-created-group')
        const consumser = await kafkaWrapper.createConsumer('message-instructor-approved-group')
        const consumser2 = await kafkaWrapper.createConsumer('message-user-blocked-group')
        const consumser3 = await kafkaWrapper.createConsumer('message-profile-updated-group')
        userCreatedConsumer.connect();
        consumser.connect();
        consumser2.connect();
        consumser3.connect();
        const listener1 = new UserProfileCreatedConsumer(userCreatedConsumer)
        const listener2 = new InstructorAprovalConsumer(consumser)
        const listener3 = new UserBlockedConsumer(consumser2)
        const listener4 = new UserProfileUpdatedConsumer(consumser3)
        await listener1.listen();
        await listener2.listen();
        await listener3.listen();
        await listener4.listen();
        await connectDB();

        httpServer.listen(PORT, () => console.log(`the Message server is running in http://localhost:${PORT} for message!!!!!!!!`))
    } catch (error) {
        console.error(error);
    }
}
start()


