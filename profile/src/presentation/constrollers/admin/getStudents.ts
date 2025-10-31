import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetStudents } from "../../../application/admin/getStudents";

export class GetStudentsController implements IController {
  constructor(private readonly _useCase: GetStudents) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { search, sort, page } = req.query;
      const students = await this._useCase.execute({
        search: search as string,
        sort: sort as string,
        page: parseInt(page as string),
        next,
      });
      if (students) {
        res.send({ students: students.students, pages: students.pages });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
