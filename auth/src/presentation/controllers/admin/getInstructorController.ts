import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { GetInstructors } from "../../../application/admin/getInstructors";

export class GetInstructorsController implements IController {
    constructor(private readonly _useCase:GetInstructors) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
        const instructors = await this._useCase.execute({next});
        res.send(instructors)
       } catch (error) {
        next(error)
       }
    }
}