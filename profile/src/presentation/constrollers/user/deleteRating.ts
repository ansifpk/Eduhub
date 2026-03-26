import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IDeleteRating } from "../../../domain/interfaces/useCases/user/IDeleteRating";

export class DeleteRatingController implements IController {
  constructor(private readonly _usecase: IDeleteRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ratingId } = req.params;
      const rating = await this._usecase.execute({ ratingId });
      if (rating) {
        res.status(StatusCodes.OK).send({ success: true, rating: rating });
      }
    } catch (error) {
      next(error);
    }
  }
}
