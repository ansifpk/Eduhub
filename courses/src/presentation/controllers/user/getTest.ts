import { IController } from "@eduhublearning/common";
import { UserGetTest } from "../../../application/user/getTest";
import { Request, Response, NextFunction } from "express";

export class UserGetTestController implements IController {
  constructor(private readonly _useCase: UserGetTest) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { testId } = req.params;
      const test = await this._useCase.execute({ testId, next });
      if (test) {
        res.send({ success: true, test: test });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
