import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { ITopRatings } from "../../../domain/interfaces/instructor/ITopRatings";

export class TopRatingsController implements IController {
  constructor(private readonly _useCase: ITopRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { userId } = req.params;
      const ratings = await this._useCase.execute({ userId });
      if (ratings) {
        return res.status(StatusCodes.OK).send({ success: true, ratings });
      }
    } catch (error) {
      next(error);
    }
  }
}
