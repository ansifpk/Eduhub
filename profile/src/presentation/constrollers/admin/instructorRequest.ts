import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorRequest } from "../../../application/admin/instructorRequest";

export class InstructorRequestController implements IController {
  constructor(private readonly _useCase: InstructorRequest) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { search, page, sort } = req.query;
      const students = await this._useCase.execute({
        search: search as string,
        page: page as string,
        sort: sort as string,
        next,
      });
      if (students) {
        res.send(students);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
