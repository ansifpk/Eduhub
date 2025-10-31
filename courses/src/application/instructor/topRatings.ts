import { IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { IRating } from "../../domain/entities/ratings";

export class TopRatings
  implements IUseCase<{ userId: string; next: NextFunction }, IRating[] | void>
{
  constructor(private readonly instructorRapository: InstructorRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<IRating[] | void> {
    try {
      const { userId } = input;
      const ratings = await this.instructorRapository.findTopRated(userId);

      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
