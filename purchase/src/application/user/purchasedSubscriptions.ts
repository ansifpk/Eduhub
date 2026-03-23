import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IUserSubscribe } from "../../domain/entities/userSubscribe";
import { IPurchasedSubscriptions } from "../../domain/interfaces/useCases/user/IPurchasedSubscriptions";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepositoru";

export class PurchasedSubscriptions
  implements IPurchasedSubscriptions{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
  }): Promise<IUserSubscribe[] | void> {
    try {
      const { userId } = input;
      const user = await this.userRepository.findUser(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const plans = await this.userRepository.plans(userId);
      if (plans) {
        return plans;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
