import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { ICart } from "../../domain/entities/cart";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";

export class AddToCart
  implements
    IUseCase<
      { courseId: string; userId: string; next: NextFunction },
      ICart | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    courseId: string;
    userId: string;
    next: NextFunction;
  }): Promise<ICart | void> {
    try {
      const { courseId, userId } = input;
      const checkUser = await this.userRepository.findById(userId);
      if (!checkUser) {
        throw new BadRequestError("User not found");
      }

      const course = await this.userRepository.findCourse(courseId);
      if (!course) {
        throw new BadRequestError("Course not found");
      }
      const checkCart = await this.userRepository.findCart(userId);

      if (checkCart) {
        console.log("ind")
        if (checkCart.courses.some((value: ICourse) => value._id == courseId)) {
          console.log("course remove akkan")
          const cart = await this.userRepository.removeFromCart(
            userId,
            courseId
          );
          if (cart) {
            return cart;
          }
        } else {
                    console.log("course add akkan")

          const cart = await this.userRepository.addToCart(userId, courseId);
          if (cart) {
            return cart;
          }
        }
      } else {
        console.log("illa")
        const cart = await this.userRepository.createCart({ courseId, userId });
        if (cart) {
          return cart;
        }
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
