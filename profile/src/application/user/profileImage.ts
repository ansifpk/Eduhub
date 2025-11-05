import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { NextFunction } from "express";
import { Iuser } from "../../domain/entities/user";
import CloudinaryV2 from "../../infrastructure/service/cloudinery";

export class ProfileImage
  implements
    IUseCase<
      {
        userId: string;
        image: {
          profileImage?: Express.Multer.File[];
        };
        next: NextFunction;
      },
      Iuser | void
    >
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinary: CloudinaryV2
  ) {}
  public async execute(input: {
    userId: string;
    image: {
      profileImage?: Express.Multer.File[];
    };
    next: NextFunction;
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
      input.next(error);
    }
  }
}
