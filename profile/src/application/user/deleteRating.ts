import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { IRating } from "../../domain/entities/ratings";
import { NextFunction } from "express";

export class DeleteRating
  implements IUseCase<{ ratingId: string; next: NextFunction }, IRating | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    ratingId: string;
    next: NextFunction;
  }): Promise<void | IRating> {
    try {
      const { ratingId } = input;
      const check = await this.userRepository.findRatinById(ratingId);
      if (!check) {
        throw new BadRequestError(ErrorMessages.RATING_NOT_FOUND);
      }
      const rating = await this.userRepository.deleteRatinById(ratingId);
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
