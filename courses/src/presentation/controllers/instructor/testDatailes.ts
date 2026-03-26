import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ITestDetailes } from "../../../domain/interfaces/instructor/ITestDetailes";

export class TestDetailesController implements IController {
  constructor(private readonly _useCase: ITestDetailes) { }
  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { testId } = req.params;
      const test = await this._useCase.execute({ testId });
      if (test) {
        res.status(StatusCodes.OK).send({ success: true, test: test });
      }
    } catch (error) {
      next(error);
    }
  }
}