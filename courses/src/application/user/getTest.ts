import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { NextFunction } from "express";
import { ITest } from "../../domain/entities/tests";

export class UserGetTest
  implements IUseCase<{ testId: string; next: NextFunction }, ITest | void>
{
  constructor(private readonly userRepositroy: UserRepository) {}
  public async execute(input: {
    testId: string;
    next: NextFunction;
  }): Promise<ITest | void> {
    try {
      const { testId } = input;
      const test = await this.userRepositroy.findTest(testId);
      if (!test) throw new BadRequestError(ErrorMessages.TEST_NOT_FOUND);

      if (test) {
        return test;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
