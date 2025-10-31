import { IController } from "@eduhublearning/common";
import { AddToCart } from "../../../application/user/addCart";
import { Request, Response, NextFunction } from "express";

export class AddToCartController implements IController {
  constructor(private readonly _useCase: AddToCart) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.body;
      const { courseId } = req.query;
      const cart = await this._useCase.execute({
        courseId: courseId as string,
        userId,
        next,
      });
      if (cart) {
        res.send({ success: true, cart: cart });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
