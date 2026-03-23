import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IReport } from "../../domain/entities/report";
import { IUserCreateReport } from "../../domain/interfaces/user/IUserCreateReport";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class UserCreateReport
  implements IUserCreateReport{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
    report: string;
    content: string;
    courseId: string;
  }): Promise<IReport | void> {
    try {
      const { userId, report, content, courseId } = input;
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }

      const checkReport = await this.userRepository.checkReport(
        userId,
        content,
        courseId
      );
      if (checkReport) {
        throw new BadRequestError(ErrorMessages.RIPORT_CONFLICT);
      }
      const createReport = await this.userRepository.createReport(
        userId,
        report,
        content,
        courseId
      );
      if (createReport) {
        return createReport;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
