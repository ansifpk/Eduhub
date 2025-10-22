import express from "express";
import { CreateChatController } from "./controllers/createChatController";
import { FindUserChatsController } from "./controllers/findUserChatsController";
import { connectDB } from "../infrastructure/db/config";
import { FindPrivetChatController } from "./controllers/findPrivetChatController";
import { charRouter } from "./routes/chatRoutes";
import { messageRouter } from "./routes/messageRoutes";
import { notificationRouter } from "./routes/notificationRoutes";
const app = express();

export class ApiServer {
    constructor() {}

    public static async run(port:number):Promise<void>{
       try {
         app.use(express.json());
         app.use(express.urlencoded({extended:true}));
         await connectDB();

         //* chat
         app.use("/message/chat",charRouter);
         //* message
         app.use("/message/message",messageRouter);
         //* notification
         app.use("/message/notification",notificationRouter);
     
         app.listen(port,()=>{
            console.log(`Message server running at ${port}...`)
         });
       } catch (error) {
        console.error(error);
       }
    }
}
