import { IController, IUseCase, StatusCodes } from "@eduhublearning/common";
import { InstructorGetStudents } from "../../../application/instructor/getStudnets";
import { Request, Response, NextFunction } from "express";

export class InstructorGetStudentsController implements IController {
  constructor(private readonly _useCase:InstructorGetStudents ) {}
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
        next,
      });
      if (students) {
        res.status(StatusCodes.OK).send({ success: true, students });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
