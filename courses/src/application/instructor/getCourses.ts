import { IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";

export class InstructorGetCourses
  implements
    IUseCase<
      {
        instructorId: string;
        search: string;
        sort: string;
        page: number;
        next: NextFunction;
      },
      ICourse[] | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    search: string;
    sort: string;
    page: number;
    next: NextFunction;
  }): Promise<ICourse[] | void> {
    try {
      const { instructorId, search, sort, page } = input;
      const courses = await this.instructorRepository.find(
        instructorId,
        search,
        sort,
        page
      );
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
