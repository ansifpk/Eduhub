import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IAddToCart } from "../../../domain/interfaces/useCases/user/IAddToCart";

export class AddToCartController implements IController {
  constructor(private readonly _useCase: IAddToCart) {}
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
      });
      if (cart) {
        res.status(StatusCodes.CREATED).send({ success: true, cart: cart });
      }
    } catch (error) {
      next(error);
    }
  }
}
