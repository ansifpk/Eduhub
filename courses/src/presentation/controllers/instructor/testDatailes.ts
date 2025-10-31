import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { TestDetailes } from "../../../application/instructor/testDetailes";

export class TestDetailesController implements IController {
    constructor(private readonly _useCase:TestDetailes) {}
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { testId } = req.params;
      const test = await this._useCase.execute({testId,next});
      if (test) {
        res.send({ success: true, test: test });
      }
    }
}