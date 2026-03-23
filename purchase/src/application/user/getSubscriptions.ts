import { IUserSubcription } from "../../domain/entities/userSubscription";
import { IGetSubscriptions } from "../../domain/interfaces/useCases/user/IGetSubscriptions";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepositoru";

export class GetSubscriptions
  implements IGetSubscriptions {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    instructorId: string;
  }): Promise<void | IUserSubcription[]> {
    try {
      const { instructorId } = input;
      const subscriptions = await this.userRepository.subscriptions(
        instructorId
      );
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
