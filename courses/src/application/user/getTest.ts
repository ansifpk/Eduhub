import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ITest } from "../../domain/entities/tests";
import { IUserGetTest } from "../../domain/interfaces/user/IUserGetTest";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class UserGetTest
  implements IUserGetTest {
  constructor(private readonly userRepositroy: IUserRepository) {}
  public async execute(input: {
    testId: string;
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
      throw error;
    }
  }
}
