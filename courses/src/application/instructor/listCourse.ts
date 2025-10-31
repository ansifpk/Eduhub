import { BadRequestError, IUseCase } from "@eduhublearning/common";
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
        throw new BadRequestError("Course not Found");
      }
      if (!course.sections) {
        throw new BadRequestError(
          "You cannot list this course becouse the video uploading is still processing..."
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
