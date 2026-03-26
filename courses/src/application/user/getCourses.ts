import { ICourse } from "../../domain/entities/course";
import { IUserGetCourses } from "../../domain/interfaces/user/IUserGetCourses";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class UserGetCourses
  implements IUserGetCourses{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    category: string;
    topic: string;
    level: string;
    search: string;
    sort: string;
    page: number;
  }): Promise<void | { courses: ICourse[]; pages: number }> {
    try {
      const { search, category, level, topic, sort, page } = input;
      const count = await this.userRepository.getPages(
        search,
        category,
        level,
        topic
      );

      const pages = count as number;
      const courses = await this.userRepository.find({
        search,
        category,
        level,
        topic,
        sort,
        page,
      });
      if (courses && pages >= 0) {
        return { courses, pages };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
