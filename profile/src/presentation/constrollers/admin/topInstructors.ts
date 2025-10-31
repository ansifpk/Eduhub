import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { TopInstructors } from "../../../application/admin/topInstructors";

export class TopInstructorsController implements IController {
  constructor(private readonly _useCase: TopInstructors) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this._useCase.execute({ next });
      if (users) {
        res.send(users);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
