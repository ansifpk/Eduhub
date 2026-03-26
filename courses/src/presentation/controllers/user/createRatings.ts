import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ICreateRating } from "../../../domain/interfaces/user/ICreateRating";

export class CreateRatingController implements IController {
  constructor(private readonly _useCase: ICreateRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { review, stars, courseId, userId } = req.body;
      const rating = await this._useCase.execute({
        courseId,
        userId,
        review,
        stars,
      });
      if (rating) {
        res.status(StatusCodes.CREATED).send({ success: true, rating: rating });
      }
    } catch (error) {
      next(error);
    }
  }
}
