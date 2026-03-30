import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetRatings } from "../../../domain/interfaces/user/IGetRatings";

export class GetratingsController implements IController {
  constructor(private readonly _useCase: IGetRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const ratings = await this._useCase.execute({ courseId });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, rating: ratings.ratings,averageRating:ratings.averageRating });
      }
    } catch (error) {
      next(error);
    }
  }
}
