import { INotification } from "../entities/notifications";

export interface ICreateNotification {
     execute(input: {
         recipientId: string;
         senderId: string;
       }): Promise<INotification | void>
}