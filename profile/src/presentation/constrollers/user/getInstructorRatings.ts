import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetInstructorRatings } from "../../../application/user/getInstructorRatings";

export class GetInstructorRatingsontroller implements IController {
  constructor(private readonly _useCase: GetInstructorRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId } = req.params;
      const ratings = await this._useCase.execute({ instructorId, next });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, ratings: ratings });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
