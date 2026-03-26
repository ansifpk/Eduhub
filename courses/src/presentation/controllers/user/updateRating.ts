import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IUpdateRating } from "../../../domain/interfaces/user/IUpdateRating";

export class UpdateRatingContoller implements IController {
  constructor(private readonly _useCase: IUpdateRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.params;
      const { review, stars } = req.body;

      const ratings = await this._useCase.execute({ _id, review, stars });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, rating: ratings });
      }
    } catch (error) {
      next(error);
    }
  }
}
