import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { NextFunction } from "express";
import { IRating } from "../../domain/entities/ratings";

export class CreateRating
  implements
    IUseCase<
      {
        courseId: string;
        userId: string;
        review: string;
        stars: number;
        next: NextFunction;
      },
      IRating | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    courseId: string;
    userId: string;
    review: string;
    stars: number;
    next: NextFunction;
  }): Promise<IRating | void> {
    try {
      const { courseId, userId, review, stars } = input;
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      const checkRatings = await this.userRepository.checkRating(
        courseId,
        userId
      );
      if (checkRatings) {
        throw new BadRequestError(ErrorMessages.RATING_CONFLICT);
      }
      const rating = await this.userRepository.createRating(
        courseId,
        userId,
        review,
        stars
      );
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
