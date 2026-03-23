import { ICourse } from "../../domain/entities/course";
import { IPurchasedCourses } from "../../domain/interfaces/user/IPurchasedCourses";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class PurchasedCourses
  implements IPurchasedCourses{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
  }): Promise<void | ICourse[]> {
    try {
      const { userId } = input;
      const courses = await this.userRepository.findWithCondition(userId);
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
