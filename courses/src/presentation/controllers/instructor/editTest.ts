import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IEditTest } from "../../../domain/interfaces/instructor/IEditTest";

export class EditTestController implements IController {
  constructor(private readonly _useCase: IEditTest) {

  }
  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { testData } = req.body;
      const { testId } = req.params;

      const course = await this._useCase.execute({ testId, testData: testData.questions })
      if (course) {
        res.status(StatusCodes.NO_CONTENT).send({ success: true });
      }
    } catch (error) {
      next(error);
    }
  }
}