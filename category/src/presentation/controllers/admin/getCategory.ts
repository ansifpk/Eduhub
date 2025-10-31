import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { GetCategories } from "../../../application/admin/GetCategories";


export class GetCategoryController implements IController {
  constructor(private readonly _useCase: GetCategories) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this._useCase.execute({ next });
      if (categories) {
        res.send(categories);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
