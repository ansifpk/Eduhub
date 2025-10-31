import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { AdminGetStudents } from "../../../application/admin/getStudents";

export class GetStudentsAdminController implements IController {
    constructor(private readonly _useCase:AdminGetStudents) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const studnets = await this._useCase.execute({next});
        res.send(studnets)
       } catch (error) {
        next(error)
       }
    }
}