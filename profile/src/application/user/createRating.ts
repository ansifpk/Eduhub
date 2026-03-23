import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { ICreateRating } from "../../domain/interfaces/useCases/user/ICreateRating";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";

export class CreateRating
  implements ICreateRating {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    instructorId: string;
    userId: string;
    review: string;
    stars: number;
  }): Promise<void | IRating> {
    try {
      const { instructorId, userId, review, stars } = input;
      const instructor = await this.userRepository.findById(userId);
      if (!instructor) {
        throw new BadRequestError(ErrorMessages.INSTRUCTOR_NOT_FOUND);
      }
      const checkRating = await this.userRepository.checkingRating(
        instructorId,
        userId
      );
      if (checkRating) {
        throw new BadRequestError(ErrorMessages.RATING_CONFLICT);
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
      throw error;
    }
  }
}
