import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { IDeleteRating } from "../../domain/interfaces/user/IDeleteRating";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class DeleteRating
  implements IDeleteRating{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    ratingId: string;
  }): Promise<IRating | void> {
    try {
      const { ratingId } = input;
      const checkRating = await this.userRepository.findRating(ratingId);
      if (!checkRating) {
        throw new BadRequestError(ErrorMessages.RATING_NOT_FOUND);
      }

      const rating = await this.userRepository.deleteRating(ratingId);
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
