import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IChat } from "../../domain/entities/chat";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { ICreateChatUseCase } from "../../domain/interfaces/ICreateChatUseCase";

export class CreateChatUseCase
  implements ICreateChatUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  public async execute(input: {
    userId: string;
    recipientId: string;
    role: string;
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
      throw error;
    }
  }
}
