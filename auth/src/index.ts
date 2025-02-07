import express from 'express';
import {json,urlencoded} from 'body-parser'
import { connectDB } from './framework/webServer/config/mongoDB/db';
import { UserRoute } from './framework/webServer/routes/userRoute';
import cors from 'cors';
import dotenv from 'dotenv';
import { AdminRoute } from './framework/webServer/routes/adminRoute';
import { InstructorRouter } from './framework/webServer/routes/instructorRouter';
import kafkaWrapper from './framework/webServer/config/kafka/kafkaWrapper';
import { InstructorAprovedConsumer } from './framework/webServer/config/kafka/consumer/instructor-approved-consumer';
import cookieSession from 'cookie-session';
import { EmailChangedConsumer } from './framework/webServer/config/kafka/consumer/email-changed-consumer';
import { UserProfileUpdatedConsumer } from './framework/webServer/config/kafka/consumer/user-profile-updated-consumer';
import { errMiddleware } from '@eduhublearning/common';
import { Server, Socket } from 'socket.io';
import {createServer} from 'http';

dotenv.config();
const app = express()
const httpServer = createServer(app);
app.set('trust proxy',true);
app.use(cors({credentials:true,
    origin: process.env.NODE_ENV === 'production'
      ? 'https://www.eduhublearning.online'
      : ['http://client-srv:5173', 'http://localhost:5173']
    ,methods: ['GET', 'POST'],}));
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(
    cookieSession({
        signed: false, 
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', 
        secure: process.env.NODE_ENV === 'production', 
      })
)

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouter = express.Router()
const instructorRouter = express.Router()

// Set up routes on the separate routers
UserRoute(userRouter);
AdminRoute(adminRouter);
InstructorRouter(instructorRouter);


// Apply the separate routers to different paths
app.use('/auth/user',userRouter);
app.use('/auth/admin',adminRouter);
app.use('/auth/instructor',instructorRouter);

app.use(errMiddleware);

let onlineUsers:{userId:string,socketId:string}[] = [];

const io = new Server(httpServer,{
    cors:{
        origin: ['http://client-srv:5173', 'http://localhost:5173',"https://www.eduhublearning.online"],
        methods: ["*"],
        credentials:true
    },
      path: '/auth/socket.io',
    })
    
    io.on("connect",(socket:Socket)=>{
        const userId = socket.handshake.query.userId as string;
        
        !onlineUsers.some((user)=>user.userId == userId)&&
        onlineUsers.push({
            userId,
            socketId:socket.id
        })
        console.log("new connection in auth srv",socket.id,onlineUsers,'onlineUsers');
        socket.on("blockUser",(userId)=>{
            const user = onlineUsers.find((user)=>user.userId == userId);
            console.log("blockUser",userId,onlineUsers,'onlineUsers',onlineUsers[0].userId==userId,"user,",user);
            if(user){
                console.log("blockUser",user.userId,'user.socketId5',user.socketId);
                io.to(user.socketId).emit(`block:${userId}`,userId)
            }else{
                console.log("illa user in online users");
                
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
        const consumer = await kafkaWrapper.createConsumer("auth-instructor-aproved-group")
        const consumer2 = await kafkaWrapper.createConsumer("auth-profile-updated-group")
        const consumer3 = await kafkaWrapper.createConsumer("email-changed-group")
        consumer.connect()
        consumer2.connect()
        consumer3.connect()

        await new InstructorAprovedConsumer(consumer).listen()
        await new UserProfileUpdatedConsumer(consumer2).listen()
        await new EmailChangedConsumer(consumer3).listen()

        await connectDB();
        httpServer.listen(process.env.PORT, () => console.log(`the server is running in http://localhost:${process.env.PORT}/auth for auth`))
    } catch (error) {
        console.error(error);
    }
}
start()
