import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { Ratings } from "../../../application/instructor/ratings";

export class RatingsController implements IController {
  constructor(private readonly _useCase: Ratings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const ratings = await this._useCase.execute({ userId, next });
      if (ratings) {
        res.send({ success: true, ratings });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
