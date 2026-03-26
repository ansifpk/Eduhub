import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IListCatgory } from "../../../domain/insterfaces/admin/useCases/IListCatgory";


export class ListCategoryController implements IController {
  constructor(private readonly _useCase: IListCatgory) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { categoryId } = req.params;

      const categories = await this._useCase.execute({ _id: categoryId });
      if (categories) {
        res.status(StatusCodes.OK).send({ success: true, data: categories });
      }
    } catch (error) {
      next(error)
    }
  }
}
