import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICourse } from "../../domain/entities/course";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";
import { IInstructorCourseDetailes } from "../../domain/interfaces/instructor/ICourseDetailes";

export class InstructorCourseDetailes
  implements IInstructorCourseDetailes{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    courseId: string;
  }): Promise<ICourse | void> {
    try {
      const { courseId } = input;
      const course = await this.instructorRepository.findByIdWthPopulate(
        courseId
      );
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }

      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
