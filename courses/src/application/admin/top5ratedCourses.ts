import { ICourse } from "../../domain/entities/course";
import { ITop5RatedCourses } from "../../domain/interfaces/admin/ITop5ratedCourses";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";

export class Top5RatedCourses
  implements ITop5RatedCourses{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(): Promise<ICourse[] | void> {
    try {
      const courses = await this.adminRepository.top5Rated();
      const data = courses?.filter((value) => value.courseReviews?.length! > 0);
      let topCourse = data?.filter((value) =>
        value.courseReviews?.find((val) => val.stars >= 2.5)
      );
      if (topCourse) {
        return topCourse.slice(0, 5);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
