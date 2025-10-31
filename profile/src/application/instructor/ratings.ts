import { IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepostory";
import { IRating } from "../../domain/entities/ratings";
import { NextFunction } from "express";

export class Ratings
  implements IUseCase<{ userId: string; next: NextFunction }, IRating[] | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}

  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<IRating[] | void> {
    try {
      const { userId } = input;
      const reports = await this.instructorRepository.findRatings(userId);
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
