
import { IChat } from "./chatType";
import { IUser } from "./chatUser";


export interface IMessage{
    chatId:IChat,
    senderId:string,
    text:string,
    isRead:boolean,
    createdAt:Date,

}