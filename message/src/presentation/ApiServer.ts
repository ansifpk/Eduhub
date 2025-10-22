import express from "express";
import { connectDB } from "../infrastructure/db/config";
import { charRouter } from "./routes/chatRoutes";
import { messageRouter } from "./routes/messageRoutes";
import { notificationRouter } from "./routes/notificationRoutes";
import {createServer} from 'http';
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Socket,Server } from 'socket.io';
import kafkaWrapper from "../infrastructure/kafka/kafkaWrapper";
import { InstructorAprovalConsumer } from "../infrastructure/kafka/consumer/instructor-approved-consumer";
import { ProfilePictureUpdatedConsumer } from "../infrastructure/kafka/consumer/picture-updated-consumer";
import { UserBlockedConsumer } from "../infrastructure/kafka/consumer/user-block-consumer";
import { UserProfileCreatedConsumer } from "../infrastructure/kafka/consumer/user-profile-created-consumer";
import { UserProfileUpdatedConsumer } from "../infrastructure/kafka/consumer/user-profile-updated-consumer";

const app = express();




export class ApiServer {
    constructor() {}

    public static async run(port:number):Promise<void>{
       try {
         
         const httpServer = createServer(app);
         const allowedOrgins =  JSON.parse(process.env.ORGINS!)
         console.log("allowedOrgins",allowedOrgins);
         console.log("process.env.ORGINS",process.env.ORGINS);
         
         app.set('trust proxy',true);
         app.use(cookieParser())
         app.use(cors({credentials:true,
            origin: allowedOrgins
         }));
         app.use(express.json());
         app.use(express.urlencoded({extended:true}));
        
         //* chat
         app.use("/message/chat",charRouter);
         //* message
         app.use("/message/message",messageRouter);
         //* notification
         app.use("/message/notification",notificationRouter);
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

         await connectDB();

         await kafkaWrapper.connect();
        const userCreatedConsumer = await kafkaWrapper.createConsumer('message-user-created-group')
        const consumser = await kafkaWrapper.createConsumer('message-instructor-approved-group')
        const consumser2 = await kafkaWrapper.createConsumer('message-user-blocked-group')
        const consumser3 = await kafkaWrapper.createConsumer('message-profile-updated-group')
        const pictureUpdatedConsumer = await kafkaWrapper.createConsumer("profile-picture-updated-group")
        const emailChangeConsumer = await kafkaWrapper.createConsumer("message-email-changed-group")
        userCreatedConsumer.connect();
        consumser.connect();
        consumser2.connect();
        consumser3.connect();
        pictureUpdatedConsumer.connect();
        emailChangeConsumer.connect();
        const listener1 = new UserProfileCreatedConsumer(userCreatedConsumer)
        const listener2 = new InstructorAprovalConsumer(consumser)
        const listener3 = new UserBlockedConsumer(consumser2)
        const listener4 = new UserProfileUpdatedConsumer(consumser3)
        const pictureUpdatedListener = new ProfilePictureUpdatedConsumer(pictureUpdatedConsumer)
        await new ProfilePictureUpdatedConsumer(emailChangeConsumer).listen()
        await listener1.listen();
        await listener2.listen();
        await listener3.listen();
        await listener4.listen();
        await pictureUpdatedListener.listen();

     
         httpServer.listen(port,()=>{
            console.log(`Message server running at ${port}...`)
         });
       } catch (error) {
        console.error(error);
       }
    }
}
