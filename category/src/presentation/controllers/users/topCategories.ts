import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { ITopCategories } from "../../../domain/insterfaces/instructor/useCases/ITopCatgories";

export class TopCategoriesController implements IController {
    constructor(private readonly _useCase: ITopCategories) {

    }

    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await this._useCase.execute();
            if (categories) {
                res.status(StatusCodes.OK).send(categories);
            }
        } catch (error) {
            next(error);
        }
    }
}