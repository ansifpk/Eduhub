import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IEditRating } from "../../../domain/interfaces/useCases/user/IEditRating";

export class EditRatingController implements IController {
  constructor(private readonly _usecase: IEditRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ratingId, review, stars } = req.body;

      const rating = await this._usecase.execute({
        ratingId,
        review,
        stars,
      });
      if (rating) {
        res.status(StatusCodes.OK).send({ success: true, rating: rating });
      }
    } catch (error) {
      next(error);
    }
  }
}
