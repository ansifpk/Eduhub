import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetStudents } from "../../../domain/interfaces/instructor/useCases/IGetStudents";

export class GetStudentsController implements IController {
  constructor(private readonly _useCase: IGetStudents) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createdUser = await this._useCase.execute();
      if (createdUser) {
        res.status(StatusCodes.OK).send({ success: true, user: createdUser });
      }
    } catch (error) {
      next(error);
    }
  }
}
