import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IProfileImage } from "../../domain/interfaces/useCases/user/IProfileImage";
import { ICloudinary } from "../../domain/interfaces/serviceInterfaces/ICloudinery";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";

export class ProfileImage
  implements
    IProfileImage {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cloudinary: ICloudinary
  ) {}
  public async execute(input: {
    userId: string;
    image: {
      profileImage?: Express.Multer.File[];
    };
  }): Promise<void | Iuser> {
    try {
      const { userId, image } = input;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      if (user.avatar.avatar_url) {
        const profile = await this.cloudinary.addFile(image.profileImage![0]);
        if (profile) {
          const update = await this.userRepository.uploadProfile(userId, {
            id: profile.public_id,
            avatar_url: profile.secure_url,
          });
          if (update) {
            return update;
          }
        }
      } else {
        const profile = await this.cloudinary.updateFile(
          image.profileImage![0],
          user.avatar.id
        );
        if (profile) {
          const update = await this.userRepository.uploadProfile(userId, {
            id: profile.public_id,
            avatar_url: profile.secure_url,
          });
          if (update) {
            return update;
          }
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
