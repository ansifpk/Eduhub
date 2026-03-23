import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetStudents } from "../../../domain/interfaces/useCases/admin/IGetStudents";

export class GetStudentsController implements IController {
  constructor(private readonly _useCase: IGetStudents) {}
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
      });
      if (students) {
        res.status(StatusCodes.OK).send({ students: students.students, pages: students.pages });
      }
    } catch (error) {
      next(error);
    }
  }
}
