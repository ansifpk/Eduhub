import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { IGetRatings } from "../../domain/interfaces/user/IGetRatings";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class GetRatings
  implements IGetRatings{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    courseId: string;
  }): Promise<void | { ratings:IRating[],averageRating:number } > {
    try {
      const { courseId } = input;
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      const ratings = await this.userRepository.ratings(courseId);
      const averageRating = await this.userRepository.findAvarageRatings(courseId);
      if (ratings && averageRating) {
        return {ratings,averageRating:averageRating.averageRating};
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
