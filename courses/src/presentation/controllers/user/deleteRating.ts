import { IController, StatusCodes } from "@eduhublearning/common";
import { DeleteRating } from "../../../application/user/deleteRating";
import { Request, Response, NextFunction } from "express";

export class DeleteRatingController implements IController {
  constructor(private readonly _useCase: DeleteRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ratingId } = req.params;

      const ratings = await this._useCase.execute({ ratingId, next });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, rating: ratings });
      }
    } catch (error) {
      next(error);
      console.error(error);
    }
  }
}
