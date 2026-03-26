import {
  BadRequestError,
  ErrorMessages,
  ForbiddenError,
} from "@eduhublearning/common";
import { ICart } from "../../domain/entities/cart";
import { IUserRepository } from "../../domain/interfaces/repositoryInterfaces/IuserRepository";
import { ICartDetailes } from "../../domain/interfaces/useCases/user/ICartDetailes";

export class CartDetailes
  implements ICartDetailes
{
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(input: {
    userId: string;
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
      throw error;
    }
  }
}
