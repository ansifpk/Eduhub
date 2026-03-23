import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { ICreateRating } from "../../domain/interfaces/user/ICreateRating";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class CreateRating
  implements ICreateRating{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    courseId: string;
    userId: string;
    review: string;
    stars: number;
  }): Promise<IRating | void> {
    try {
      const { courseId, userId, review, stars } = input;
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      const checkRatings = await this.userRepository.checkRating(
        courseId,
        userId
      );
      if (checkRatings) {
        throw new BadRequestError(ErrorMessages.RATING_CONFLICT);
      }
      const rating = await this.userRepository.createRating(
        courseId,
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
