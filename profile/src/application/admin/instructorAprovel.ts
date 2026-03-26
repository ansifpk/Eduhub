import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IInstructorAprovel } from "../../domain/interfaces/useCases/admin/IInstructorAprovel";
import { IAdminRepository } from "../../domain/interfaces/repositoryInterfaces/IadminRepository";

export class InstructorAprovel
  implements IInstructorAprovel {
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    email: string;
    status: string;
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
     throw error;
    }
  }
}
