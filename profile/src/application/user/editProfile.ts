import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IEditProfile } from "../../domain/interfaces/useCases/user/IEditProfile";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";

export class EditProfile
  implements IEditProfile{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    userId: string;
    name: string;
    thumbnail: string;
    aboutMe: string;
  }): Promise<Iuser | void> {
    try {
      const { userId, name, thumbnail, aboutMe } = input;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const updatedUser = await this.userRepository.findByIdAndUpdate(
        userId,
        name,
        thumbnail,
        aboutMe
      );
      if (updatedUser) {
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
