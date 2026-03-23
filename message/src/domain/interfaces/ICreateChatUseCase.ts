import { IChat } from "../entities/chat";

export interface ICreateChatUseCase {
    execute(input: {
        userId: string;
        recipientId: string;
        role: string;
      }): Promise<IChat | void>
}