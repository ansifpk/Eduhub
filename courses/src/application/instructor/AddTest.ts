import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ITest } from "../../domain/entities/tests";
import { IAddTest } from "../../domain/interfaces/instructor/IAddTest";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class AddTest
  implements IAddTest {
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    courseId: string;
    testData: ITest;
  }): Promise<ITest|void> {
    try {
      const { courseId, testData } = input;
      const course = await this.instructorRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      const test = await this.instructorRepository.creatTest(testData);
      if (test) {
        const course = await this.instructorRepository.addTest(
          courseId,
          test._id
        );
        if (course) {
          return test;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
