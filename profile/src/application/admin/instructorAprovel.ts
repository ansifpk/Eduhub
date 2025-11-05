import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class InstructorAprovel
  implements
    IUseCase<
      { email: string; status: string; next: NextFunction },
      Iuser | void
    >
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    email: string;
    status: string;
    next: NextFunction;
  }): Promise<Iuser | void> {
    try {
      const { email, status } = input;
      const user = await this.adminRepository.findByEmail(email);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      let updatedUser;
      if (status == "Rejected") {
        updatedUser = await this.adminRepository.approveIntructor(
          email,
          status,
          false
        );

        return updatedUser;
      } else {
        updatedUser = await this.adminRepository.approveIntructor(
          email,
          status,
          true
        );
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
