import { BadRequestError,ErrorMessages } from "@eduhublearning/common";
import { INotification } from "../../domain/entities/notifications";
import { ICreateNotification } from "../../domain/interfaces/ICreateNotification";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class CreateNotification
  implements ICreateNotification {
  constructor(private readonly _userRepository: IUserRepository) {}
  public async execute(input: {
    recipientId: string;
    senderId: string;
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
      throw error;
    }
  }
}
