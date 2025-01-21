import { UpdateWriteOpResult } from "mongoose";
import { IChat } from "../../../../entities/chat";
import { IMessage } from "../../../../entities/message";
import { INotification } from "../../../../entities/notifications";
import { IUser } from "../../../../entities/user";
import { IUserRepository } from "../../../../useCases/interfaces/repositoryInterfaces/IUserRepository";
import { chatModel } from "../models/chat";
import { messageModel } from "../models/messageModel";
import { notificationModel } from "../models/notificationModel";
import { userModel } from "../models/userModel";
export class UserRepository implements IUserRepository{
  
    constructor(
        private userModels:typeof userModel,
        private chatModels:typeof chatModel,
        private messageModels:typeof messageModel,
        private notificationModels:typeof notificationModel,
    ){}

   async  updateNotification(userId: string, senterId: string): Promise<UpdateWriteOpResult | void> {
      try {
        const notifications = await this.notificationModels.updateMany({
          recipientId:userId,
          senderId:senterId,
          isRead:true,
        });
        if(notifications) return notifications;
      } catch (error) {
        console.error(error)
        }
    }

    async createNotification(recipientId: string, senderId: string): Promise<INotification | void> {
      try {
        const chats = await this.notificationModels.create({
          recipientId,
          senderId
        })
        if(chats) return chats;
      } catch (error) {
        console.error(error)
        }
    }
    async findAllNotification(recipientId: string): Promise<INotification[] | void> {
      try {
        const chats = await this.notificationModels.find({recipientId:recipientId,isRead:false}).sort({createdAt:-1})
        if(chats) return chats;
    } catch (error) {
       console.error(error)
      }
    }
 
    async find(userId: string): Promise<IChat[] | void> {
        try {
            const chats = await this.chatModels.find({members:{$in:[userId]}}).populate("members").sort({createdAt:-1})
            if(chats) return chats;
        } catch (error) {
           console.error(error)
          }
    }

    async findChat(userId:string,recipientId:string): Promise<IChat|void>{
      try {
        const chat = await this.chatModels.findOne({members:{$all:[userId,recipientId]}}).populate("members");
        if(chat) return chat

      } catch (error) {
        console.error(error)
      }
    }

    async findChatById(chatId:string): Promise<IChat|void>{
      try {
        const chat = await this.chatModels.findOne({_id:chatId}).populate("members");
        
        if(chat) return chat

      } catch (error) {
        console.error(error)
      }
    }

    async findUserById(userId: string): Promise<IUser | void> {
       try {
         const user = await this.userModels.findById({_id:userId});
         if(user) return user;
       } catch (error) {
        console.error(error)
       }
    }
    async create(userId: string, recipientId: string,role:string): Promise<IChat | void> {
        try {
       
          const chat = await this.chatModels.create({
            members:[userId,recipientId],
            role:role
          });
          await chat.save();
          if(chat) return chat;
          
        } catch (error) {
         console.error(error)
        }
    }

    //TODO messages

    async createMessage(chatId:string,senderId:string,text:string): Promise<IMessage | void> {
      try {
        
         const message = await this.messageModels.create({
          chatId:chatId,
          senderId:senderId,
          text:text
         })
         if(message) return message
      } catch (error) {
        console.error(error)
      }
    }
    async findAllMessages(chatId: string): Promise<IMessage[] | void> {
      try {
         const messages = await this.messageModels.find({chatId:chatId});
         if(messages) return messages;
      } catch (error) {
        console.error(error)
      }
    }
  
}