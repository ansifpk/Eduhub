import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IRatings } from "../../../domain/interfaces/useCases/instructor/IRatings";

export class RatingsController implements IController {
  constructor(private readonly _useCase: IRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const ratings = await this._useCase.execute({ userId });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, ratings });
      }
    } catch (error) {
      next(error);
    }
  }
}
