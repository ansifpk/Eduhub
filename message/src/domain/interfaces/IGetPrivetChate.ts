import { IChat } from "../entities/chat";

export interface IGetPrivetChate {
    execute(input: {
        chatId: string;
      }): Promise<IChat | void>
}