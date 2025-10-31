import { IUseCase } from "@eduhublearning/common";
import { ICourse } from "../../domain/entities/course";
import { NextFunction } from "express";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";

export class UserGetCourses
  implements
    IUseCase<
      {
        category: string;
        topic: string;
        level: string;
        search: string;
        sort: string;
        page: number;
        next: NextFunction;
      },
      { courses: ICourse[]; pages: number } | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    category: string;
    topic: string;
    level: string;
    search: string;
    sort: string;
    page: number;
    next: NextFunction;
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
      input.next(error);
    }
  }
}
