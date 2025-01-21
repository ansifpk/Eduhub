import { NextFunction } from "express";
import { IChat } from "../../../entities/chat";
import { IMessage } from "../../../entities/message";
import { INotification } from "../../../entities/notifications";
import { UpdateWriteOpResult } from "mongoose";

export interface IUserUseCase{
    //*chat
    createChat(userId:string,recipientId:string,role:string,next:NextFunction):Promise<IChat|void>
    fetchChats(userId:string,next:NextFunction):Promise<IChat[]|void>
    privetChat(chatId:string,next:NextFunction):Promise<IChat|void>
    
    //*message
    fetchMessages(chatId:string):Promise<IMessage[]|void>
    insertMessage(chatId:string,senderId:string,text:string,next:NextFunction):Promise<IMessage|void>
    //*message
    getNotifications(recipientId:string,next:NextFunction):Promise<INotification[]|void>
    createNotifications(recipientId:string,senderId:string,next:NextFunction):Promise<INotification|void>
    markAsRead(userId:string,senterId:string,next:NextFunction):Promise<UpdateWriteOpResult|void>
}