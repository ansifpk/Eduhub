import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IAddCategory } from "../../../domain/insterfaces/admin/useCases/IAddCategory";

export class AddCategoryController implements IController {
  constructor(private readonly _useCase: IAddCategory) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this._useCase.execute({ data: req.body });
      if (categories) {
        res.status(StatusCodes.CREATED).send({ success: true, data: categories });
      }
    } catch (error) {
      next(error);
    }
  }
}
