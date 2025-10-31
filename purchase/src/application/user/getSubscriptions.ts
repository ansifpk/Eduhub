import { IUseCase } from "@eduhublearning/common";
import { ICourse } from "../../domain/entities/course";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { NextFunction } from "express";
import { IUserSubcription } from "../../domain/entities/userSubscription";

export class GetSubscriptions
  implements
    IUseCase<
      { instructorId: string; next: NextFunction },
      IUserSubcription[] | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    instructorId: string;
    next: NextFunction;
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
      input.next(error);
      console.error(error);
    }
  }
}
