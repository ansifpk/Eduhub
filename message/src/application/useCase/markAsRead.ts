import { BadRequestError,ErrorMessages } from "@eduhublearning/common";
import { UpdateWriteOpResult } from "mongoose";
import { IMarkAsRead } from "../../domain/interfaces/IMarkAsRead";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class MarkAsRead
  implements IMarkAsRead {
  constructor(private readonly _userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
    senderId: string;
  }): Promise<UpdateWriteOpResult | void> {
    try {
      const user = await this._userRepository.findUserById(input.senderId);

      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
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
      throw error;
    }
  }
}
