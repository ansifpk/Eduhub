import { IUseCase } from "@eduhublearning/common";
import { ITest } from "../../domain/entities/test";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";

export class TestDetailes
  implements IUseCase<{ testId: string ,next:NextFunction}, ITest | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: { testId: string,next:NextFunction }): Promise<ITest | void> {
    try {
      const { testId } = input;
      const test = await this.instructorRepository.findTest(testId);

      if (test) {
        return test;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
