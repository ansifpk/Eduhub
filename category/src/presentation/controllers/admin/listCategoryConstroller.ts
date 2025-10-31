import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { ListCategory } from "../../../application/admin/listCategory";


export class ListCategoryController implements IController {
  constructor(private readonly _useCase: ListCategory) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { categoryId } = req.params;

      const categories = await this._useCase.execute({ _id: categoryId, next });
      if (categories) {
        res.status(201).send({ success: true, data: categories });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
