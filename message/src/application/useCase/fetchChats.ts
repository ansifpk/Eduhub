import { BadRequestError,ErrorMessages } from "@eduhublearning/common";
import { IChat } from "../../domain/entities/chat";
import { IFetchChats } from "../../domain/interfaces/IFetchChats";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class FetchChats implements IFetchChats {
  constructor(private readonly _userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
  }): Promise<IChat[] | void> {
    try {
      const user = await this._userRepository.findUserById(input.userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const userChats = await this._userRepository.find(input.userId);
      if (userChats) {
        return userChats;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
