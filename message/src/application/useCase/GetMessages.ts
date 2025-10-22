import { NextFunction } from "express";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { IMessage } from "../../domain/entities/message";

export class GetMessages
  implements
    IUseCase<{ chatId: string; next: NextFunction }, IMessage[] | void>
{
  constructor(public readonly _userRepository: UserRepository) {}
  public async execute(input: {
    chatId: string;
    next: NextFunction;
  }): Promise<IMessage[] | void> {
    try {
      const messages = await this._userRepository.findAllMessages(input.chatId);
      if (messages) {
        return messages;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
