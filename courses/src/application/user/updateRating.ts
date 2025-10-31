import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { NextFunction } from "express";
import { IRating } from "../../domain/entities/ratings";

export class UpdateRating
  implements
    IUseCase<
      { _id: string; review: string; stars: number; next: NextFunction },
      IRating | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    _id: string;
    review: string;
    stars: number;
    next: NextFunction;
  }): Promise<IRating | void> {
    try {
      const { _id, review, stars } = input;
      const rating = await this.userRepository.findRating(_id);

      if (!rating) {
        throw new BadRequestError("Rating not Found");
      }
      const updatedRating = await this.userRepository.editRating(
        _id,
        review,
        stars
      );
      if (updatedRating) {
        return updatedRating;
      }
    } catch (error) {
      input.next(error);
      console.error(error);
    }
  }
}
