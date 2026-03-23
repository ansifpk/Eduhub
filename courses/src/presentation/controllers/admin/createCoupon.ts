import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ICreateCoupon } from "../../../domain/interfaces/admin/ICreateCoupon";

export class CreateCouponController implements IController {
  constructor(private readonly _useCase: ICreateCoupon) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode,
      } = req.body;

      const coupon = await this._useCase.execute({
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode,
      });
      if (coupon) {
        res.status(StatusCodes.CREATED).send({ success: true, coupon: coupon });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
