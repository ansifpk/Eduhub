import { ICart } from "../../../entities/cart";

export interface ICartDetailes {
     execute(input: {
        userId: string;
      }): Promise<void | ICart>
}