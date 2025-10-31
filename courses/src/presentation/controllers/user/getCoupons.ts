import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { UserGetCoupons } from "../../../application/user/getCoupons";

export class UserGetCouponsController implements IController {
  constructor(private readonly _useCase: UserGetCoupons) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const coupons = await this._useCase.execute({ next });
      if (coupons) {
        res.send({ success: true, coupons: coupons });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
