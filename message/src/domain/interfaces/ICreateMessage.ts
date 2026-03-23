import { IMessage } from "../entities/message";

export interface ICreateMessage {
     execute(input: {
         chatId: string;
         senderId: string;
         text: string;
       }): Promise<IMessage | void>
}