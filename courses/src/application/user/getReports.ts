import { IReport } from "../../domain/entities/report";
import { IGetReports } from "../../domain/interfaces/user/IGetReports";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class GetReports
  implements IGetReports{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
    courseId: string;
  }): Promise<void | IReport[]> {
    try {
      const { userId, courseId } = input;
      const reports = await this.userRepository.findReports(userId, courseId);
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
