import { IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";
import { NextFunction } from "express";
import { ISection } from "../../domain/entities/section";

export class DeleteLecture
  implements
    IUseCase<{ lectureUrl: string; next: NextFunction }, ISection | void>
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    lectureUrl: string;
    next: NextFunction;
  }): Promise<ISection | void> {
    try {
      const section = await this.adminRepository.deleteLecture(
        input.lectureUrl
      );
      if (section) {
        return section;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
