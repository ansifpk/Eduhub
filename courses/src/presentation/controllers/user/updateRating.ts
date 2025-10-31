import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { UpdateRating } from "../../../application/user/updateRating";

export class UpdateRatingContoller implements IController {
  constructor(private readonly _useCase: UpdateRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.params;
      const { review, stars } = req.body;

      const ratings = await this._useCase.execute({ _id, review, stars, next });
      if (ratings) {
        res.send({ success: true, rating: ratings });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
