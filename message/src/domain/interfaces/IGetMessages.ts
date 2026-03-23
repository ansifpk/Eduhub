import { IMessage } from "../entities/message";

export interface IGetMessages {
    execute(input: {
        chatId: string;
      }): Promise<IMessage[] | void>
}