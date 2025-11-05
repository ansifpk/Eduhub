import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { CheckTocken } from "../../../application/instructor/checkTocken";
import { ForbiddenError, StatusCodes } from "@eduhublearning/common";

export class CheckTockenController implements IController {
  constructor(private readonly _useCase: CheckTocken) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.cookies.refreshInstructorToken) {
        throw new ForbiddenError();
      }
      const tocken = req.cookies.refreshInstructorToken;

      const tockens = await this._useCase.execute({ tocken, next });
      if (tockens) {
        res.cookie("accessInstructorToken", tockens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
          path: "/",
          maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshInstructorToken", tockens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(StatusCodes.OK).send({ success: true, tockens });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
