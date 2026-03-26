import { IController, IUseCase, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetStudents } from "../../../domain/interfaces/instructor/IGetStudents";

export class InstructorGetStudentsController implements IController {
  constructor(private readonly _useCase:IGetStudents ) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId, search, sort, page } = req.query;
      const students = await this._useCase.execute({
        instructorId: instructorId as string,
        search: search as string,
        sort: sort as string,
        page: page as string,
      });
      if (students) {
        res.status(StatusCodes.OK).send({ success: true, students });
      }
    } catch (error) {
      next(error);
    }
  }
}
