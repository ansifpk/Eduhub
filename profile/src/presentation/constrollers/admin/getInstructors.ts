import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetInstructors } from "../../../application/admin/getInstructors";

export class GetInstructorsController implements IController {
  constructor(private readonly _useCase: GetInstructors) {}
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
        next,
      });
      if (instructors) {
        res.status(StatusCodes.OK).send(instructors);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
