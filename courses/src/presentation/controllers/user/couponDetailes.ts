import { IController, IUseCase } from "@eduhublearning/common";
import { UserCouponDetailes } from "../../../application/user/couponDetailes";
import { Request, Response, NextFunction } from "express";

export class UserCouponDetailesController implements IController {
  constructor(private readonly _useCase: UserCouponDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { couponCode, userId } = req.params;
      const coupons = await this._useCase.execute({ couponCode, userId, next });
      if (coupons) {
        res.send({ success: true, coupons: coupons });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
