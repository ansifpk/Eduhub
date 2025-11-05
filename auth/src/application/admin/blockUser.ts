import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { IUseCase } from "../../shared/IUseCase";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class BlockUser
  implements IUseCase<{ userId: string; next: NextFunction }, Iuser | void>
{
  constructor(private readonly repository: AdminRepository) {}
  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<Iuser | void> {
    try {
      const check = await this.repository.findById(input.userId);
      if (check) {
        const data = await this.repository.block(check);
        if (data) {
          return data;
        }
      } else {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      input.next(error);
    }
  }
}
