import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { NextFunction } from "express";
import { IRating } from "../../domain/entities/ratings";
import { startSession } from "mongoose";

export class EditRating
  implements
    IUseCase<
      { ratingId: string; review: string; stars: number; next: NextFunction },
      IRating | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    ratingId: string;
    review: string;
    stars: number;
    next: NextFunction;
  }): Promise<void | IRating> {
    try {
      const { ratingId, review, stars } = input;
      const check = await this.userRepository.findRatinById(ratingId);
      if (!check) {
        throw new BadRequestError("Rating not found");
      }
      const rating = await this.userRepository.editRatinById(
        ratingId,
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
