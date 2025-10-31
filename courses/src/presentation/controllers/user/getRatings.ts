import { IController } from "@eduhublearning/common";
import { GetRatings } from "../../../application/user/getRatings";
import { Request, Response, NextFunction } from "express";

export class GetratingsController implements IController {
  constructor(private readonly _useCase: GetRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const ratings = await this._useCase.execute({ courseId, next });
      if (ratings) {
        res.send({ success: true, rating: ratings });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
