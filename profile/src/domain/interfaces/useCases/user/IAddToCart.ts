import { ICart } from "../../../entities/cart";

export interface IAddToCart {
    execute(input: {
        courseId: string;
        userId: string;
      }): Promise<ICart | void>
}