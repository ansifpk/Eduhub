import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ITest } from "../../domain/entities/tests";
import { IEditTest } from "../../domain/interfaces/instructor/IEditTest";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class EditTest
  implements IEditTest{
  constructor(private instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    testId: string;
    testData: ITest;
  }): Promise<ITest | void> {
    try {
      const { testData, testId } = input;
      const checkTest = await this.instructorRepository.findTest(testId);
      if (!checkTest) {
        throw new BadRequestError(ErrorMessages.TEST_NOT_FOUND);
      }

      const updatedTest = await this.instructorRepository.editTest(
        testId,
        testData
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
