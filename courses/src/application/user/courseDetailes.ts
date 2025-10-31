import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";

export class UserCourseDatailes
  implements IUseCase<{ courseId: string; next: NextFunction }, ICourse | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    courseId: string;
    next: NextFunction;
  }): Promise<void | ICourse> {
    try {
      const { courseId } = input;
      const course = await this.userRepository.findById(courseId);
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
      input.next(error)
    }
  }
}
