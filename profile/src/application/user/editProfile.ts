import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class EditProfile
  implements
    IUseCase<
      {
        userId: string;
        name: string;
        thumbnail: string;
        aboutMe: string;
        next: NextFunction;
      },
      Iuser | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    userId: string;
    name: string;
    thumbnail: string;
    aboutMe: string;
    next: NextFunction;
  }): Promise<Iuser | void> {
    try {
      const { userId, name, thumbnail, aboutMe } = input;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new BadRequestError("User Not Found");
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
      input.next(error);
    }
  }
}
