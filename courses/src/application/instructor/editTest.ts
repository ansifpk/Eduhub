import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { ITest } from "../../domain/entities/test";
import { NextFunction } from "express";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";

export class EditTest
  implements
    IUseCase<
      { testId: string; testData: ITest; next: NextFunction },
      ITest | void
    >
{
  constructor(private instructorRepository: InstructorRepository) {}
  public async execute(input: {
    testId: string;
    testData: ITest;
    next: NextFunction;
  }): Promise<ITest | void> {
    try {
      const { testData, testId } = input;
      const checkTest = await this.instructorRepository.findTest(testId);
      if (!checkTest) {
        throw new BadRequestError("Test not Found");
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
      input.next(error);
    }
  }
}
