import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICart } from "../../domain/entities/cart";
import { ICourse } from "../../domain/entities/course";
import { IAddToCart } from "../../domain/interfaces/useCases/user/IAddToCart";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";

export class AddToCart
  implements IAddToCart {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(input: {
    courseId: string;
    userId: string;
  }): Promise<ICart | void> {
    try {
      const { courseId, userId } = input;
      const [checkUser, course, checkCart] = await Promise.all([
        this.userRepository.findById(userId),
        this.userRepository.findCourse(courseId),
        this.userRepository.findCart(userId),
      ]);
      if (!checkUser) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }

      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }

       
      if (checkCart) {
        if (checkCart.courses.some((value: ICourse) => value._id == courseId)) {
          const cart = await this.userRepository.removeFromCart(
            userId,
            courseId
          );
          if (cart) {
            return cart;
          }
        } else {
               
          const cart = await this.userRepository.addToCart(userId, courseId);
          if (cart) {
            return cart;
          }
        }
      } else {
        const cart = await this.userRepository.createCart({ courseId, userId });
        if (cart) {
          return cart;
        }
      }
    } catch (error) {
      console.error(error);
     throw error;
    }
  }
}
