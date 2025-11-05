import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { ITest } from "../../domain/entities/test";

export class AddTest
  implements
    IUseCase<
      { courseId: string; testData: ITest; next: NextFunction },
      any | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    courseId: string;
    testData: ITest;
    next: NextFunction;
  }): Promise<any> {
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
      input.next(error);
    }
  }
}
