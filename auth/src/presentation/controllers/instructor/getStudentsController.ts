import { Request, Response, NextFunction } from "express";
import { GetStudents } from "../../../application/instructor/getStudents";
import { IController } from "../../../shared/IController";

export class GetStudentsController implements IController {
    constructor(private readonly _useCase:GetStudents) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
         const createdUser = await this._useCase.execute({next})
        if(createdUser){
          res.send({success:true,user:createdUser})
        }
       } catch (error) {
        
       }
    }
}