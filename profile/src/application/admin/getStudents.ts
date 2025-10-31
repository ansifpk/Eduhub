import { IController, IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { NextFunction } from "express";
import { Iuser } from "../../domain/entities/user";

export class GetStudents
  implements
    IUseCase<
      { search: string; sort: string; page: number; next: NextFunction },
      { students: Iuser[]; pages: number } | void
    >
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    search: string;
    sort: string;
    page: number;
    next: NextFunction;
  }): Promise<{ students: Iuser[]; pages: number } | void> {
    try {
      const { search, page, sort } = input;
      const count = await this.adminRepository.getUserPages(search, sort);
      const pages = count as number;
      const students = await this.adminRepository.find(search, sort, page);
      if (students) {
        return { students, pages };
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
