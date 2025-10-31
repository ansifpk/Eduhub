import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { TestSubmit } from "../../../application/user/testSubmit";

export class TestSubmitController implements IController {
  constructor(private readonly _useCase: TestSubmit) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { testId } = req.params;
      const { userId, mark } = req.body;
      const test = await this._useCase.execute({ userId, testId, mark, next });
      if (test) {
        res.send({ success: true });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
