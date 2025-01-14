import { NextFunction } from "express";
import { IChat } from "../../../entities/chat";
import { IMessage } from "../../../entities/message";
import { IUser } from "../../../entities/user";
import { INotification } from "../../../entities/notifications";

export interface IUserRepository{
    //TODO chat
    findUserById(userId:string):Promise<IUser|void>;
    create(userId:string,recipientId:string,role:string):Promise<IChat|void>;
    find(userId:string):Promise<IChat[]|void>;
    findChat(userId:string,recipientId:string): Promise<IChat|void>
    findChatById(chatId:string): Promise<IChat|void>

     //TODO message
     createMessage(chatId:string,senderId:string,text:string): Promise<IMessage|void>
     findAllMessages(chatId:string): Promise<IMessage[]|void>
     //TODO notifications
     createNotification(recipientId:string,senderId:string): Promise<INotification|void>
     findAllNotification(recipientId:string): Promise<INotification[]|void>
}