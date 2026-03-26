import { ICourse } from "../../domain/entities/course";
import { ITop5Courses } from "../../domain/interfaces/instructor/ITop5Courses";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class Top5instructorCourses
  implements ITop5Courses{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    userId: string;
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
      throw error;
    }
  }
}
