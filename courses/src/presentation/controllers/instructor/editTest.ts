import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { EditTest } from "../../../application/instructor/editTest";

export class EditTestController implements IController {
    constructor(private readonly _useCase:EditTest) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
             const {testData} = req.body;
          const {testId} = req.params;
          
      const course =  await this._useCase.execute({testId,testData:testData.questions,next})
      if(course){
        res.status(StatusCodes.NO_CONTENT).send({success:true});
      }
    }
}