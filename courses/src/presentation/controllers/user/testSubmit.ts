import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ITestSubmit } from "../../../domain/interfaces/user/ITestSubmit";

export class TestSubmitController implements IController {
  constructor(private readonly _useCase: ITestSubmit) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { testId } = req.params;
      const { userId, mark } = req.body;
      const test = await this._useCase.execute({ userId, testId, mark });
      if (test) {
        res.status(StatusCodes.CREATED).send({ success: true });
      }
    } catch (error) {
      next(error);
    }
  }
}
