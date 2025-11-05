import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { BadRequestError } from "@eduhublearning/common";
import { IChat } from "../../domain/entities/chat";
import { ErrorMessages } from "../../../../common/src/errors/errorMessages";

export class CreateChatUseCase
  implements
    IUseCase<
      { userId: string; recipientId: string; role: string; next: NextFunction },
      IChat | void
    >
{
  constructor(private readonly _userRepository: UserRepository) {}

  public async execute(input: {
    userId: string;
    recipientId: string;
    role: string;
    next: NextFunction;
  }): Promise<IChat | void> {
    try {
      const checkCurrentUser = await this._userRepository.findUserById(
        input.userId
      );
      const checkRecipientUser = await this._userRepository.findUserById(
        input.recipientId
      );
      if (!checkCurrentUser || !checkRecipientUser) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }

  
      const checkChatExists = await this._userRepository.findChat(
        input.userId,
        input.recipientId
      );
      if (checkChatExists) {
        return checkChatExists;
      }
      const chat = await this._userRepository.create(
        input.userId,
        input.recipientId,
        input.role
      );
      if (chat) {
        const newChat = await this._userRepository.findChat(
          input.userId,
          input.recipientId
        );
        return newChat;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
