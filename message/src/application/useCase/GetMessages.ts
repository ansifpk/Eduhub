import { IMessage } from "../../domain/entities/message";
import { IGetMessages } from "../../domain/interfaces/IGetMessages";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class GetMessages
  implements IGetMessages {
  constructor(public readonly _userRepository: IUserRepository) {}
  public async execute(input: {
    chatId: string;
  }): Promise<IMessage[] | void> {
    try {
      const messages = await this._userRepository.findAllMessages(input.chatId);
      if (messages) {
        return messages;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
