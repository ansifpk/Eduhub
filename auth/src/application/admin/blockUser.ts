import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IBlockUser } from "../../domain/interfaces/admin/useCases/IBlockUser";
import { IAdminRepository } from "../../domain/interfaces/admin/repositories/IAdminRepository";
import { mapUserToBlockUserDto } from "../mapers/admin/mapUserToBlockUserDto";
import { IBlockUserResponseDto } from "../dtos/admin/BlockUserResponseDto";

export class BlockUser implements IBlockUser{
  constructor(private readonly repository: IAdminRepository) {}
  public async execute(input: {
    userId: string;
  }): Promise<IBlockUserResponseDto | void> {
    try {
      const check = await this.repository.findById(input.userId);
      if (check) {
        const data = await this.repository.block(check);
        if (data) {
          const userDto = mapUserToBlockUserDto(data)
          return userDto;
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
