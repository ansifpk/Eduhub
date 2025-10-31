import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { IRating } from "../../domain/entities/ratings";
import { NextFunction } from "express";

export class DeleteRating
  implements IUseCase<{ ratingId: string; next: NextFunction }, IRating | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    ratingId: string;
    next: NextFunction;
  }): Promise<IRating | void> {
    try {
      const { ratingId } = input;
      const checkRating = await this.userRepository.findRating(ratingId);
      if (!checkRating) {
        throw new BadRequestError("Rating not Found");
      }

      const rating = await this.userRepository.deleteRating(ratingId);
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
