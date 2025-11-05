import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { EditCategory } from "../../../application/admin/editCategory";
import { StatusCodes } from "@eduhublearning/common";


export class EditCategoryController implements IController {
    constructor(private readonly _useCase:EditCategory) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
           try {
      const {_id,title,description,topics} = req.body; 
      const categories = await this._useCase.execute(
        {_id,
        title,
        description,
        topics,
        next}
      );
    
      if (categories) {
         res.status(StatusCodes.OK).send({ success: true, data: categories });
      }
    } catch (error) {
      console.error(error);
    }
    }
}