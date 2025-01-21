import { IChat } from "./chat";
import { IUser } from "./user";

export interface IMessage{
    chatId:IChat,
    senderId:IUser,
    text:string,
    isRead:boolean,
    createdAt:Date,

}