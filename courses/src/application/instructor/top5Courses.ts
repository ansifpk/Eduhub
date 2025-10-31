import { IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";

export class Top5instructorCourses
  implements IUseCase<{ userId: string; next: NextFunction }, ICourse[] | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<ICourse[] | void> {
    try {
      const { userId } = input;
      const courses = await this.instructorRepository.findTop5(userId);

      if (courses) {
        return courses
          .sort((a, b) => b.students?.length! - a.students?.length!)
          .slice(0, 5);
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
