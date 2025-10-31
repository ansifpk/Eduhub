import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { CreateRating } from "../../../application/user/createRating";

export class CreateRatingController implements IController {
  constructor(private readonly _useCase: CreateRating) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId, review, userId, stars } = req.body;

      const rating = await this._useCase.execute({
        instructorId,
        userId,
        review,
        stars,
        next,
      });
      if (rating) {
        res.send({ success: true, rating: rating });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
