import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICourse } from "../../domain/entities/course";
import { IListCourse } from "../../domain/interfaces/instructor/IIistCourse";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class ListCourse
  implements IListCourse{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    courseId: string;
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
      throw error;
    }
  }
}
