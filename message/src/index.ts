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
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import cookieParser from 'cookie-parser';
import { ProfilePictureUpdatedConsumer } from './framwork/webServer/config/kafka/consumer/picture-updated-consumer';

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

const allowedOrgins =  JSON.parse(process.env.ORGINS!)



app.use(cors({credentials:true,
    origin: allowedOrgins
}));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
// Apply the separate routers to different paths
app.use('/message/chat',chatRouter);
app.use('/message/message',messageRouter);
app.use('/message/notification',notificationRouter);
app.use("*",(req,res)=>{
     throw new NotFoundError("Path Not Found.") 
})
app.use(errorHandler as any);

//! web socket configurations
let onlineUsers:{userId:string,socketId:string}[] = [];

const io = new Server(httpServer,{
cors:{
    origin: allowedOrgins,
    credentials:true
},
  path: process.env.SOCKET_PATH,
})

io.on("connect",(socket:Socket)=>{
    console.log("new connection in message srv",socket.id);
    
    //TODO listen connection
    socket.on("addNewUser",(userId:string)=>{
     
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

    //* mark seen message
    socket.on("seenMsg",(res)=>{
      const user = onlineUsers.find((user)=>user.userId == res.senter);

       if(user){
        io.to(user.socketId).emit("markSeenMessage");
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
      
        // await kafkaWrapper.connect();
        // const userCreatedConsumer = await kafkaWrapper.createConsumer('message-user-created-group')
        // const consumser = await kafkaWrapper.createConsumer('message-instructor-approved-group')
        // const consumser2 = await kafkaWrapper.createConsumer('message-user-blocked-group')
        // const consumser3 = await kafkaWrapper.createConsumer('message-profile-updated-group')
        // const pictureUpdatedConsumer = await kafkaWrapper.createConsumer("profile-picture-updated-group")
        // const emailChangeConsumer = await kafkaWrapper.createConsumer("message-email-changed-group")
        // userCreatedConsumer.connect();
        // consumser.connect();
        // consumser2.connect();
        // consumser3.connect();
        // pictureUpdatedConsumer.connect();
        // emailChangeConsumer.connect();
        // const listener1 = new UserProfileCreatedConsumer(userCreatedConsumer)
        // const listener2 = new InstructorAprovalConsumer(consumser)
        // const listener3 = new UserBlockedConsumer(consumser2)
        // const listener4 = new UserProfileUpdatedConsumer(consumser3)
        // const pictureUpdatedListener = new ProfilePictureUpdatedConsumer(pictureUpdatedConsumer)
        // await new ProfilePictureUpdatedConsumer(emailChangeConsumer).listen()
        // await listener1.listen();
        // await listener2.listen();
        // await listener3.listen();
        // await listener4.listen();
        // await pictureUpdatedListener.listen();
        await connectDB();

        httpServer.listen(PORT, () => console.log(`the Message server is running in http://localhost:${PORT} for message!!!!!!!!`))
    } catch (error) {
        console.error(error);
    }
}
start()


