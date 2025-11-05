import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetProfile } from "../../../application/user/getProfile";

export class GetProfileController implements IController {
  constructor(private readonly _useCase: GetProfile) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.query;
      const userProfile = await this._useCase.execute({
        userId: userId as string,
        next,
      });
      if (userProfile) {
        res.status(StatusCodes.OK).send({ success: true, userData: userProfile });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
