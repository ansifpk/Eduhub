import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IAddTest } from "../../../domain/interfaces/instructor/IAddTest";

export class AddTestController implements IController {
  constructor(private readonly _useCase: IAddTest) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { testData } = req.body;
      const { courseId } = req.params;
      const course = await this._useCase.execute({
        courseId,
        testData: testData.questions,
      });
      if (course) {
        res.status(StatusCodes.CREATED).send({ success: true });
      }
    } catch (error) {
      next(error);
    }
  }
}
