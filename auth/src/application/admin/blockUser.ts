import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IBlockUser } from "../../domain/interfaces/admin/useCases/IBlockUser";
import { IAdminRepository } from "../../domain/interfaces/admin/repositories/IAdminRepository";

export class BlockUser implements IBlockUser{
  constructor(private readonly repository: IAdminRepository) {}
  public async execute(input: {
    userId: string;
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
      throw error;
    }
  }
}
