import { IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";

export class Top5RatedCourses
  implements IUseCase<{ next: NextFunction }, ICourse[] | void>
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    next: NextFunction;
  }): Promise<ICourse[] | void> {
    try {
      const courses = await this.adminRepository.top5Rated();
      const data = courses?.filter((value) => value.courseReviews?.length! > 0);
      let topCourse = data?.filter((value) =>
        value.courseReviews?.find((val) => val.stars >= 2.5)
      );
      if (topCourse) {
        return topCourse.slice(0, 5);
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
