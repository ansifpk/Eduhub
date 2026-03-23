import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetInstructors } from "../../../domain/interfaces/useCases/admin/IGetInstructors";

export class GetInstructorsController implements IController {
  constructor(private readonly _useCase: IGetInstructors) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { search, sort, page } = req.query;
      const instructors = await this._useCase.execute({
        search: search as string,
        sort: sort as string,
        page: parseInt(page as string),
      });
      if (instructors) {
        res.status(StatusCodes.OK).send(instructors);
      }
    } catch (error) {
      next(error);
    }
  }
}
