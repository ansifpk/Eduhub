import { ICourse } from "../../domain/entities/course";
import { IUserCourseDatailes } from "../../domain/interfaces/user/IUserCourseDatailes";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class UserCourseDatailes
  implements IUserCourseDatailes{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    courseId: string;
  }): Promise<void | ICourse> {
    try {
      const { courseId } = input;
      const course = await this.userRepository.findById(courseId);
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
