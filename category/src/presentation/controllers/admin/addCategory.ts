import { Request, Response, NextFunction } from "express";
import { AddCategory } from "../../../application/admin/addCategory";
import { IController } from "../../../shared/IController";

export class AddCategoryController implements IController {
  constructor(private readonly _useCase: AddCategory) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this._useCase.execute({ data: req.body, next });
      if (categories) {
        res.status(201).send({ success: true, data: categories });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
