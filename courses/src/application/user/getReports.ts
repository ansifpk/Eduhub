import { IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { NextFunction } from "express";
import { IReport } from "../../domain/entities/report";

export class GetReports
  implements
    IUseCase<
      { userId: string; courseId: string; next: NextFunction },
      IReport[] | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    courseId: string;
    next: NextFunction;
  }): Promise<void | IReport[]> {
    try {
      const { userId, courseId } = input;
      const reports = await this.userRepository.findReports(userId, courseId);
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
