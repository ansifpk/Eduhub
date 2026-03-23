import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetInstructorRatings } from "../../../domain/interfaces/useCases/user/IGetInstructorRatings";

export class GetInstructorRatingsontroller implements IController {
  constructor(private readonly _useCase: IGetInstructorRatings) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId } = req.params;
      const ratings = await this._useCase.execute({ instructorId });
      if (ratings) {
        res.status(StatusCodes.OK).send({ success: true, ratings: ratings });
      }
    } catch (error) {
      next(error);
    }
  }
}
