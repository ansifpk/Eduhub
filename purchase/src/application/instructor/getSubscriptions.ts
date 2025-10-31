import { IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { ISubcription } from "../../domain/entities/subscription";
import { NextFunction } from "express";

export class InstrutcorGetSubscriptions
  implements IUseCase<{ next: NextFunction }, ISubcription[] | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    next: NextFunction;
  }): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.instructorRepository.findSubscriptions();
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
