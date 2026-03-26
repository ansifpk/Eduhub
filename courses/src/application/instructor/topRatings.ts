import { IRating } from "../../domain/entities/ratings";
import { ITopRatings } from "../../domain/interfaces/instructor/ITopRatings";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class TopRatings
  implements ITopRatings {
  constructor(private readonly instructorRapository: IInstructorRepository) {}
  public async execute(input: {
    userId: string;
  }): Promise<IRating[] | void> {
    try {
      const { userId } = input;
      const ratings = await this.instructorRapository.findTopRated(userId);

      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
