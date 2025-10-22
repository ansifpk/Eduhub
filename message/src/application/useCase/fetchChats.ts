import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { BadRequestError } from "@eduhublearning/common";
import { IChat } from "../../domain/entities/chat";

export class FetchChats
  implements IUseCase<{ userId: string; next: NextFunction }, IChat[] | void>
{
  constructor(private readonly _userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<IChat[] | void> {
    try {
      const user = await this._userRepository.findUserById(input.userId);
      if (!user) {
        throw new BadRequestError("User Not Found");
      }
      const userChats = await this._userRepository.find(input.userId);
      if (userChats) {
        return userChats;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
