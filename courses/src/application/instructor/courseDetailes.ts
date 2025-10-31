import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { ICourse } from "../../domain/entities/course";

export class InstructorCourseDetailes
  implements IUseCase<{ courseId: string; next: NextFunction }, ICourse | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    courseId: string;
    next: NextFunction;
  }): Promise<ICourse | void> {
    try {
      const { courseId } = input;
      const course = await this.instructorRepository.findByIdWthPopulate(
        courseId
      );
      if (!course) {
        throw new BadRequestError("Course Not Foun");
      }

      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
