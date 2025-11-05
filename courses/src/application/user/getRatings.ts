import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { NextFunction } from "express";
import { IRating } from "../../domain/entities/ratings";

export class GetRatings
  implements
    IUseCase<{ courseId: string; next: NextFunction }, IRating[] | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    courseId: string;
    next: NextFunction;
  }): Promise<void | IRating[]> {
    try {
      const { courseId } = input;
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      const ratings = await this.userRepository.ratings(courseId);
      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
