import { ICourse } from "../../domain/entities/course";
import { IGetInstructorCourses } from "../../domain/interfaces/user/IGetInstructorCourses";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class GetInstructorCourses
  implements IGetInstructorCourses{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    instructorId: string;
  }): Promise<ICourse[] | void> {
    try {
      const { instructorId } = input;
      const courses = await this.userRepository.courses(instructorId);
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
