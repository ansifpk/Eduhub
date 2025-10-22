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

const app = express();
app.set('trust proxy',true);




export class ApiServer {
    constructor() {}

    public static async run(port:number):Promise<void>{
       try {
         const httpServer = createServer(app);
         const allowedOrgins =  JSON.parse(process.env.ORGINS!)
         console.log("allowedOrgins",allowedOrgins);
         console.log("process.env.ORGINS",process.env.ORGINS);
         
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

     
         httpServer.listen(port,()=>{
            console.log(`Message server running at ${port}...`)
         });
       } catch (error) {
        console.error(error);
       }
    }
}
