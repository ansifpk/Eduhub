import { IController, StatusCodes } from "@eduhublearning/common";
import { InstructorRepository } from "../../../insfrastructure/db/repositories/instructorRepository";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { TopRatings } from "../../../application/instructor/topRatings";

export class TopRatingsController implements IController {
  constructor(private readonly _useCase: TopRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { userId } = req.params;
      const ratings = await this._useCase.execute({ userId, next });
      if (ratings) {
        return res.status(StatusCodes.OK).send({ success: true, ratings });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
