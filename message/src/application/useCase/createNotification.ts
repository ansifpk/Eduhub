import { BadRequestError } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { INotification } from "../../domain/entities/notifications";
import { NextFunction } from "express";
import { ErrorMessages } from "../../../../common/src/errors/errorMessages";

export class CreateNotification
  implements
    IUseCase<
      { recipientId: string; senderId: string; next: NextFunction },
      INotification | void
    >
{
  constructor(private readonly _userRepository: UserRepository) {}
  public async execute(input: {
    recipientId: string;
    senderId: string;
    next: NextFunction;
  }): Promise<INotification | void> {
    try {
      const user = await this._userRepository.findUserById(input.recipientId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const user2 = await this._userRepository.findUserById(input.senderId);
      if (!user2) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const notifications = await this._userRepository.createNotification(
        input.recipientId,
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
