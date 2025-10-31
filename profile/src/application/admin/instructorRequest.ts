import { IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class InstructorRequest
  implements
    IUseCase<
      { search: string; page: string; sort: string; next: NextFunction },
      Iuser[] | void
    >
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    search: string;
    page: string;
    sort: string;
    next: NextFunction;
  }): Promise<Iuser[] | void> {
    try {
      const { search, page, sort } = input;
      const requests = await this.adminRepository.findIntructorRequests(
        search,
        page,
        sort
      );
      return requests;
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
