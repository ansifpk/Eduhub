import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { CartDetailes } from "../../../application/user/cartDetailes";

export class CartDetailesController implements IController {
  constructor(private readonly _useCase: CartDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const cart = await this._useCase.execute({ userId, next });
      if (cart) {
        const cartTotal = cart.courses.reduce((acc, cur) => acc + cur.price, 0);
        res.status(StatusCodes.OK).send({ success: true, cart: cart, cartTotal });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
