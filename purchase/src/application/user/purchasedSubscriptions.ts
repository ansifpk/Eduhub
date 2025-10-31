import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { NextFunction } from "express";
import { IUserSubscribe } from "../../domain/entities/userSubscribe";

export class PurchasedSubscriptions
  implements
    IUseCase<{ userId: string; next: NextFunction }, IUserSubscribe[] | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<IUserSubscribe[] | void> {
    try {
      const { userId } = input;
      const user = await this.userRepository.findUser(userId);
      if (!user) {
        throw new BadRequestError("user not fount");
      }
      const plans = await this.userRepository.plans(userId);
      if (plans) {
        return plans;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
