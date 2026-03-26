import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";
import { IGetProfile } from "../../domain/interfaces/useCases/user/IGetProfile";

export class GetProfile implements IGetProfile {
  constructor(private readonly userRepository: IUserRepository) {

  }
  public async execute(input: { userId: string }): Promise<Iuser | void> {
    try {
      const { userId } = input;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND)
      }
      return user

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}