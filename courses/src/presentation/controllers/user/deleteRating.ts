import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IDeleteRating } from "../../../domain/interfaces/user/IDeleteRating";

export class DeleteRatingController implements IController {
  constructor(private readonly _useCase: IDeleteRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ratingId } = req.params;

      const ratings = await this._useCase.execute({ ratingId });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, rating: ratings });
      }
    } catch (error) {
      next(error);
    }
  }
}
