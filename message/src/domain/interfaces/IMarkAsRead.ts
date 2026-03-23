import { UpdateWriteOpResult } from "mongoose";

export interface IMarkAsRead {
    execute(input: {
        userId: string;
        senderId: string;
      }): Promise<UpdateWriteOpResult | void> 
}