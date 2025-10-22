import { NextFunction } from "express";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { IChat } from "../../domain/entities/chat";

export class GetPrivetChate
  implements IUseCase<{ chatId: string; next: NextFunction }, IChat | void>
{
  constructor(private readonly _userRepository: UserRepository) {}
  public async execute(input: {
    chatId: string;
    next: NextFunction;
  }): Promise<IChat | void> {
    try {
      const chat = await this._userRepository.findChatById(input.chatId);

      if (!chat) {
        throw new BadRequestError("Chat Not Found");
      }
      if (chat.members[1].isBlock) {
        throw new BadRequestError("This user is blocked");
      }
      return chat;
    } catch (error) {
      console.error(error);
    }
  }
}
