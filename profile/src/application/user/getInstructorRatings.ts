import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IRating } from "../../domain/entities/ratings";
import { IGetInstructorRatings } from "../../domain/interfaces/useCases/user/IGetInstructorRatings";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";

export class GetInstructorRatings
  implements IGetInstructorRatings {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    instructorId: string;
  }): Promise<void | IRating[]> {
    try {
      const { instructorId } = input;
      const instructor = await this.userRepository.findById(instructorId);
      if (!instructor) {
        throw new BadRequestError(ErrorMessages.INSTRUCTOR_NOT_FOUND);
      }

      const ratings = await this.userRepository.findAllrating(instructorId);
      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
