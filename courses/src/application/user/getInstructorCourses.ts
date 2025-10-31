import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";

export class GetInstructorCourses
  implements
    IUseCase<{ instructorId: string; next: NextFunction }, ICourse[] | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    instructorId: string;
    next: NextFunction;
  }): Promise<ICourse[] | void> {
    try {
      const { instructorId } = input;
      const courses = await this.userRepository.courses(instructorId);
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
