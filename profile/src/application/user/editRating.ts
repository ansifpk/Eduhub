import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { IEditRating } from "../../domain/interfaces/useCases/user/IEditRating";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";

export class EditRating
  implements IEditRating {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    ratingId: string;
    review: string;
    stars: number;
  }): Promise<void | IRating> {
    try {
      const { ratingId, review, stars } = input;
      const check = await this.userRepository.findRatinById(ratingId);
      if (!check) {
        throw new BadRequestError(ErrorMessages.RATING_NOT_FOUND);
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
      throw error;
    }
  }
}
