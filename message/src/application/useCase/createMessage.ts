import { BadRequestError, ForbiddenError } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { NextFunction } from "express";
import { IMessage } from "../../domain/entities/message";

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
        throw new BadRequestError("Chat Not Found");
      }
      if (checkChat.members[1].isBlock) {
        throw new BadRequestError("This user is blocked");
      }

      const checkUser = await this._usrRepository.findUserById(input.senderId);

      if (!checkUser) {
        throw new BadRequestError("User Not Found");
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
