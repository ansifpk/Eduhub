import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { TopCategories } from "../../../application/instructor/topCategories";

export class TopCategoriesController implements IController {
    constructor(private readonly _useCase:TopCategories) {
        
    }
    
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
         try {
       
        
         const categories = await this._useCase.execute({next});
         if(categories){
             res.send(categories);
         }
       } catch (error) {
        console.error(error)
        next(error);
       }
    }
}