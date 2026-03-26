import { BadRequestError, ForbiddenError,ErrorMessages } from "@eduhublearning/common";
import { IMessage } from "../../domain/entities/message";
import { ICreateMessage } from "../../domain/interfaces/ICreateMessage";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class CreateMessage
  implements ICreateMessage{
  constructor(private readonly _usrRepository: IUserRepository) {}
  public async execute(input: {
    chatId: string;
    senderId: string;
    text: string;
  }): Promise<IMessage | void> {
    try {
      const checkChat = await this._usrRepository.findChatById(input.chatId);
      if (!checkChat) {
        throw new BadRequestError(ErrorMessages.CHAT_NOT_FOUND);
      }
      if (checkChat.members[1].isBlock) {
        throw new BadRequestError(ErrorMessages.BLOCKED_CHAT);
      }

      const checkUser = await this._usrRepository.findUserById(input.senderId);

      if (!checkUser) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      if (checkUser.isBlock) {
        throw new ForbiddenError();
      }

      const message = await this._usrRepository.createMessage(
        input.chatId,
        input.senderId,
        input.text
      );
      if (message) {
        return message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
