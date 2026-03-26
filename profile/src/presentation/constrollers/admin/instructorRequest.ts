import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstructorRequest } from "../../../domain/interfaces/useCases/admin/IInstructorRequest";

export class InstructorRequestController implements IController {
  constructor(private readonly _useCase: IInstructorRequest) {}
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
      });
      if (students) {
        res.status(StatusCodes.OK).send(students);
      }
    } catch (error) {
      next(error);
    }
  }
}
