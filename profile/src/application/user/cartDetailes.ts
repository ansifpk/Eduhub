import {
  BadRequestError,
  ErrorMessages,
  ForbiddenError,
  IUseCase,
} from "@eduhublearning/common";
import { NextFunction } from "express";
import { ICart } from "../../domain/entities/cart";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";

export class CartDetailes
  implements IUseCase<{ userId: string; next: NextFunction }, ICart | void>
{
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(input: {
    userId: string;
    next: NextFunction;
  }): Promise<void | ICart> {
    try {
      const { userId } = input;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      if (user.isBlock) {
        throw new ForbiddenError();
      }
      const cart = await this.userRepository.findCart(userId);
      if (cart) {
        return cart;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
