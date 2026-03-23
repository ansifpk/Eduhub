import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ITopInstructors } from "../../../domain/interfaces/useCases/admin/ITopInstructors";

export class TopInstructorsController implements IController {
  constructor(private readonly _useCase: ITopInstructors) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this._useCase.execute();
      if (users) {
        res.status(StatusCodes.OK).send(users);
      }
    } catch (error) {
      next(error);
    }
  }
}
