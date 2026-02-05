
import { Server, Socket } from 'socket.io';
import kafkaWrapper from '../infrastructure/kafka/kafkaWrapper';
import { InstructorAprovedConsumer } from '../infrastructure/kafka/consumer/instructor-approved-consumer';
import { UserProfileUpdatedConsumer } from '../infrastructure/kafka/consumer/user-profile-updated-consumer';
import { EmailChangedConsumer } from '../infrastructure/kafka/consumer/email-changed-consumer';
import { allowedOrgins, httpServer } from '../app';
import { connectDB } from '../infrastructure/db/models/config';

export class ApiServer {
   
    public static async run(port:number):Promise<void>{  
        try {  
            await connectDB();
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
            httpServer.listen(port,()=>console.log(`auth service running at ${port}...`));
        } catch (error) {
            console.error(error);
        }
    }
}