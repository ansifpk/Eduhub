import { BadRequestError,ErrorMessages } from "@eduhublearning/common";
import { IChat } from "../../domain/entities/chat";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IGetPrivetChate } from "../../domain/interfaces/IGetPrivetChate";

export class GetPrivetChate
  implements IGetPrivetChate {
  constructor(private readonly _userRepository: IUserRepository) {}
  public async execute(input: {
    chatId: string;
  }): Promise<IChat | void> {
    try {
      const chat = await this._userRepository.findChatById(input.chatId);

      if (!chat) {
        throw new BadRequestError(ErrorMessages.CHAT_NOT_FOUND);
      }
      if (chat.members[1].isBlock) {
        throw new BadRequestError(ErrorMessages.BLOCKED_CHAT);
      }
      return chat;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
