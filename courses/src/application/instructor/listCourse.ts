import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";

export class ListCourse
  implements IUseCase<{ courseId: string; next: NextFunction }, ICourse | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    courseId: string;
    next: NextFunction;
  }): Promise<ICourse | void> {
    try {
      const { courseId } = input;
      const course = await this.instructorRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      if (!course.sections) {
        throw new BadRequestError(
          ErrorMessages.COURSE_LISTING_IN_PROCESS
        );
      }

      const listedCourse = await this.instructorRepository.list(
        courseId,
        course.isListed
      );
      if (listedCourse) {
        return listedCourse;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
