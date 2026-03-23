import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IUserGetCoupons } from "../../../domain/interfaces/user/IUserGetCoupons";

export class UserGetCouponsController implements IController {
  constructor(private readonly _useCase: IUserGetCoupons) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const coupons = await this._useCase.execute();
      if (coupons) {
        res.status(StatusCodes.OK).send({ success: true, coupons: coupons });
      }
    } catch (error) {
      next(error);
    }
  }
}
