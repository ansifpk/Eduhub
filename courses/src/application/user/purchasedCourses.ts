import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";

export class PurchasedCourses
  implements IUseCase<{ userId: string; next: NextFunction }, ICourse[] | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<void | ICourse[]> {
    try {
      const { userId } = input;
      const courses = await this.userRepository.findWithCondition(userId);
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
