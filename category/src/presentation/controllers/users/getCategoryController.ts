import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetCategory } from "../../../domain/insterfaces/instructor/useCases/IGetCategory";

export class GetCategoryUserController implements IController {
  constructor(private readonly _useCase: IGetCategory) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this._useCase.execute();
      if (categories) {
        res.status(StatusCodes.OK).send(categories);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
