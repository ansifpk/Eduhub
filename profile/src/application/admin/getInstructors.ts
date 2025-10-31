import { IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class GetInstructors
  implements
    IUseCase<
      { search: string; sort: string; page: number; next: NextFunction },
      Iuser[] | void
    >
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    search: string;
    sort: string;
    page: number;
    next: NextFunction;
  }): Promise<Iuser[] | void> {
    try {
      const { search, sort, page } = input;
      let instructors = await this.adminRepository.findInstructors(
        search,
        sort,
        page
      );

      if (instructors) {
        return instructors;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
