import { IRating } from "../../domain/entities/ratings";
import { IRatings } from "../../domain/interfaces/useCases/instructor/IRatings";
import { IInstructorRepository } from "../../domain/interfaces/repositoryInterfaces/IinstructorInterface";

export class Ratings implements IRatings{
  constructor(private readonly instructorRepository: IInstructorRepository) {}

  public async execute(input: {
    userId: string;
  }): Promise<IRating[] | void> {
    try {
      const { userId } = input;
      const reports = await this.instructorRepository.findRatings(userId);
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
