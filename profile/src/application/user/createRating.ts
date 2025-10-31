import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { IRating } from "../../domain/entities/ratings";
import { NextFunction } from "express";

export class CreateRating
  implements
    IUseCase<
      {
        instructorId: string;
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
    instructorId: string;
    userId: string;
    review: string;
    stars: number;
    next: NextFunction;
  }): Promise<void | IRating> {
    try {
      const { instructorId, userId, review, stars } = input;
      const instructor = await this.userRepository.findById(userId);
      if (!instructor) {
        throw new BadRequestError("Instructor Not Found");
      }
      const checkRating = await this.userRepository.checkingRating(
        instructorId,
        userId
      );
      if (checkRating) {
        throw new BadRequestError("Already Rated this instructor");
      }
      const rating = await this.userRepository.createRating(
        instructorId,
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
