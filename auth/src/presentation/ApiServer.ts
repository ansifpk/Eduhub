import express from 'express';
import cors from 'cors';
const app = express()
import {createServer} from 'http'
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import { userRouter } from './routers/userRouter';
import { instructorRouter } from './routers/instructorRouter';
import { connectDB } from '../infrastructure/db/models/config';
import { Server, Socket } from 'socket.io';
import { adminRouter } from './routers/adminRouter';
import kafkaWrapper from '../infrastructure/kafka/kafkaWrapper';
import { InstructorAprovedConsumer } from '../infrastructure/kafka/consumer/instructor-approved-consumer';
import { UserProfileUpdatedConsumer } from '../infrastructure/kafka/consumer/user-profile-updated-consumer';
import { EmailChangedConsumer } from '../infrastructure/kafka/consumer/email-changed-consumer';

export class ApiServer {
   

    public static async run(port:number):Promise<void>{
        try {
            const httpServer = createServer(app);
            app.set('trust proxy',true);
            const allowedOrgins =  JSON.parse(process.env.ORGINS!)
            
            app.use(cors({
                origin: allowedOrgins,
                credentials:true,
                }
            ));
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use(cookieParser())
            
            await connectDB();
            
            app.use('/auth/user',userRouter);
            app.use('/auth/admin',adminRouter);
            app.use('/auth/instructor',instructorRouter);

            app.use("*",(req,res)=>{
                 throw new NotFoundError("Path Not Found.") 
            })
            app.use(errorHandler as any)

            //* socket connection 

            let onlineUsers:{userId:string,socketId:string}[] = [];
            
            const io = new Server(httpServer,{
                cors:{
                    origin: allowedOrgins,
                    credentials:true
                },
                  path: process.env.SOCKET_PATH,
                })
                
                io.on("connect",(socket:Socket)=>{
                    const userId = socket.handshake.query.userId as string;
                    
                    !onlineUsers.some((user)=>user.userId == userId)&&
                    onlineUsers.push({
                        userId,
                        socketId:socket.id
                    })
                    
                    socket.on("blockUser",(userId)=>{
                     
                        const user = onlineUsers.find((user)=>user.userId == userId);
                        if(user){
                            io.to(user.socketId).emit(`block:${userId}`)
                        }
                    })
                    //*disconnect user when
                    socket.on("disconnect",()=>{
                        onlineUsers = onlineUsers.filter((user)=>user.socketId !== socket.id)
                        io.emit("getOnlineUsers",onlineUsers)
                    })
                })
            // await kafkaWrapper.connect();
            // const consumer = await kafkaWrapper.createConsumer("auth-instructor-aproved-group")
            // const consumer2 = await kafkaWrapper.createConsumer("auth-profile-updated-group")
            // const consumer3 = await kafkaWrapper.createConsumer("email-changed-group")
            // consumer.connect()
            // consumer2.connect()
            // consumer3.connect()
            // await new InstructorAprovedConsumer(consumer).listen()
            // await new UserProfileUpdatedConsumer(consumer2).listen()
            // await new EmailChangedConsumer(consumer3).listen()
            httpServer.listen(port,()=>console.log(`auth service running at ${port}...`))
        } catch (error) {
            console.error(error);
        }
    }
}