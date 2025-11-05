import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { NextFunction } from "express";
import { IInstructorSubscribe } from "../../domain/entities/instructorSubscribe";

export class InstructorPlans
  implements
    IUseCase<
      { userId: string; next: NextFunction },
      IInstructorSubscribe[] | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<IInstructorSubscribe[] | void> {
    try {
      const { userId } = input;
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const plans = await this.instructorRepository.findPlans(userId);
      if (plans) {
        return plans;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
