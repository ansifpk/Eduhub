import { NextFunction } from "express";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { INotification } from "../../domain/entities/notifications";

export class GetNotification
  implements
    IUseCase<
      { recipientId: string; next: NextFunction },
      INotification[] | void
    >
{
  constructor(private readonly _useRepository: UserRepository) {}
  public async execute(input: {
    recipientId: string;
    next: NextFunction;
  }): Promise<INotification[] | void> {
    try {
      const user = await this._useRepository.findUserById(input.recipientId);

      if (!user) {
        throw new BadRequestError("User Not Found");
      }
      const notifications = await this._useRepository.findAllNotification(
        input.recipientId
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
