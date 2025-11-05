import { IController, StatusCodes } from "@eduhublearning/common";
import { CreateRating } from "../../../application/user/createRatings";
import { Request, Response, NextFunction } from "express";

export class CreateRatingController implements IController {
  constructor(private readonly _useCase: CreateRating) {}
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
        next,
      });
      if (rating) {
        res.status(StatusCodes.CREATED).send({ success: true, rating: rating });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
