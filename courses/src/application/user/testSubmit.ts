import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ITest } from "../../domain/entities/tests";
import { ITestSubmit } from "../../domain/interfaces/user/ITestSubmit";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class TestSubmit
  implements ITestSubmit{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
    testId: string;
    mark: number;
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
      throw error;
    }
  }
}
