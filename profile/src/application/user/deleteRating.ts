import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";
import { IDeleteRating } from "../../domain/interfaces/useCases/user/IDeleteRating";

export class DeleteRating
  implements IDeleteRating {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    ratingId: string;
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
      throw error;
    }
  }
}
