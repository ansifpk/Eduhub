import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { ITest } from "../../domain/entities/tests";
import { NextFunction } from "express";

export class TestSubmit
  implements
    IUseCase<
      { userId: string; testId: string; mark: number; next: NextFunction },
      ITest | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    testId: string;
    mark: number;
    next: NextFunction;
  }): Promise<ITest | void> {
    try {
      const { userId, testId, mark } = input;
      const test = await this.userRepository.findTest(testId);
      if (!test) throw new BadRequestError(ErrorMessages.TEST_NOT_FOUND);

      const updatedTest = await this.userRepository.submitTest(
        userId,
        testId,
        mark
      );
      if (updatedTest) {
        return updatedTest;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
