import { NextFunction } from "express";
import { IChat } from "../../../entities/chat";
import { IMessage } from "../../../entities/message";
import { IUser } from "../../../entities/user";

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
}