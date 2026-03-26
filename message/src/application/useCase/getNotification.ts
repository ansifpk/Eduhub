import { BadRequestError,ErrorMessages } from "@eduhublearning/common";
import { INotification } from "../../domain/entities/notifications";
import { IGetNotification } from "../../domain/interfaces/IGetNotification";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class GetNotification
  implements IGetNotification {
  constructor(private readonly _useRepository: IUserRepository) {}
  public async execute(input: {
    recipientId: string;
  }): Promise<INotification[] | void> {
    try {
      const user = await this._useRepository.findUserById(input.recipientId);

      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const notifications = await this._useRepository.findAllNotification(
        input.recipientId
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
