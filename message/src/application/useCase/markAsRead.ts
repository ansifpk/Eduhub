import { NextFunction } from "express";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { UpdateWriteOpResult } from "mongoose";

export class MarkAsRead
  implements
    IUseCase<
      { userId: string; senderId: string; next: NextFunction },
      UpdateWriteOpResult | void
    >
{
  constructor(private readonly _userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    senderId: string;
    next: NextFunction;
  }): Promise<UpdateWriteOpResult | void> {
    try {
      const user = await this._userRepository.findUserById(input.senderId);

      if (!user) {
        throw new BadRequestError("User Not Found");
      }
      const notifications = await this._userRepository.updateNotification(
        input.userId,
        input.senderId
      );
      if (notifications) {
        return notifications;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
