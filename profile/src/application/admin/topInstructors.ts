import { IUseCase } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { NextFunction } from "express";

export class TopInstructors
  implements IUseCase<{ next: NextFunction }, Iuser[] | void>
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: { next: NextFunction }): Promise<void | Iuser[]> {
    try {
      const instructors = await this.adminRepository.findTop5Instructors();
      if (instructors) {
        const data = instructors.filter(
          (value) => value.instructorReviews?.length! > 0
        );
        let users = data.filter((value) =>
          value.instructorReviews?.find((val) => val.stars >= 2.5)
        );
        if (users) {
          return users.slice(0, 5);
        }
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
