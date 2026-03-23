import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IEditCategory } from "../../../domain/insterfaces/admin/useCases/IEditCategory";


export class EditCategoryController implements IController {
    constructor(private readonly _useCase:IEditCategory) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
           try {
      const {_id,title,description,topics} = req.body; 
      const categories = await this._useCase.execute(
        {_id,
        title,
        description,
        topics,
        }
      );
    
      if (categories) {
         res.status(StatusCodes.OK).send({ success: true, data: categories });
      }
    } catch (error) {
      next(error);
    }
    }
}