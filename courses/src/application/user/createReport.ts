import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { NextFunction } from "express";
import { IReport } from "../../domain/entities/report";

export class UserCreateReport
  implements
    IUseCase<
      {
        userId: string;
        report: string;
        content: string;
        courseId: string;
        next: NextFunction;
      },
      IReport | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    report: string;
    content: string;
    courseId: string;
    next: NextFunction;
  }): Promise<IReport | void> {
    try {
      const { userId, report, content, courseId } = input;
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError("Course not Found");
      }

      const checkReport = await this.userRepository.checkReport(
        userId,
        content,
        courseId
      );
      if (checkReport) {
        throw new BadRequestError("Already report this video");
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
      input.next(error);
    }
  }
}
