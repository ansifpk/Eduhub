import { ICourse } from "../../domain/entities/course";
import { IGetCourse } from "../../domain/interfaces/instructor/IGetCourses";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class InstructorGetCourses
  implements IGetCourse{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    search: string;
    sort: string;
    page: number;
  }): Promise<ICourse[] | void> {
    try {
      const { instructorId, search, sort, page } = input;
      const courses = await this.instructorRepository.find(
        instructorId,
        search,
        sort,
        page
      );
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
