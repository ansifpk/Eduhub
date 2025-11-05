import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { IRating } from "../../domain/entities/ratings";
import { NextFunction } from "express";

export class GetInstructorRatings
  implements
    IUseCase<{ instructorId: string; next: NextFunction }, IRating[] | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    instructorId: string;
    next: NextFunction;
  }): Promise<void | IRating[]> {
    try {
      const { instructorId } = input;
      const instructor = await this.userRepository.findById(instructorId);
      if (!instructor) {
        throw new BadRequestError(ErrorMessages.INSTRUCTOR_NOT_FOUND);
      }

      const ratings = await this.userRepository.findAllrating(instructorId);
      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
