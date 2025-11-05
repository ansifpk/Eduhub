import { IController, StatusCodes } from "@eduhublearning/common";
import { DeleteRating } from "../../../application/user/deleteRating";
import { Request, Response, NextFunction } from "express";

export class DeleteRatingController implements IController {
  constructor(private readonly _usecase: DeleteRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ratingId } = req.params;
      const rating = await this._usecase.execute({ ratingId, next });
      if (rating) {
        res.status(StatusCodes.OK).send({ success: true, rating: rating });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
