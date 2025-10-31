import { IController } from "@eduhublearning/common";
import { DeleteRating } from "../../../application/user/deleteRating";
import { Request, Response, NextFunction } from "express";
import { EditRating } from "../../../application/user/editRating";

export class EditRatingController implements IController {
  constructor(private readonly _usecase: EditRating) {}
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
        next,
      });
      if (rating) {
        res.send({ success: true, rating: rating });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
