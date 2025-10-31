import { IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { Iuser } from "../../domain/entities/user";

export class InstructorGetStudents
  implements
    IUseCase<
      {
        instructorId: string;
        search: string;
        sort: string;
        page: string;
        next: NextFunction;
      },
      Iuser[] | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    search: string;
    sort: string;
    page: string;
    next: NextFunction;
  }): Promise<void | Iuser[]> {
    try {
      const { instructorId, search, sort, page } = input;
      const students = await this.instructorRepository.findStudents(
        instructorId,
        search,
        sort,
        parseInt(page)
      );

      return students;
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
