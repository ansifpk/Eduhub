import { BadRequestError, ForbiddenError } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { NextFunction } from "express";
import { IMessage } from "../../domain/entities/message";
import { ErrorMessages } from "../../../../common/src/errors/errorMessages";

export class CreateMessage
  implements
    IUseCase<
      { chatId: string; senderId: string; text: string; next: NextFunction },
      IMessage | void
    >
{
  constructor(private readonly _usrRepository: UserRepository) {}
  public async execute(input: {
    chatId: string;
    senderId: string;
    text: string;
    next: NextFunction;
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
      input.next(error);
    }
  }
}
