import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { IUpdateRating } from "../../domain/interfaces/user/IUpdateRating";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class UpdateRating
  implements IUpdateRating{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    _id: string;
    review: string;
    stars: number;
  }): Promise<IRating | void> {
    try {
      const { _id, review, stars } = input;
      const rating = await this.userRepository.findRating(_id);

      if (!rating) {
        throw new BadRequestError(ErrorMessages.RATING_NOT_FOUND);
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
      console.error(error);
      throw error;
    }
  }
}
