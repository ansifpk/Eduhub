import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetStudents } from "../../../domain/interfaces/admin/useCases/IGetStudents";

export class GetStudentsAdminController implements IController {
    constructor(private readonly _useCase:IGetStudents) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const studnets = await this._useCase.execute();
        res.status(StatusCodes.OK).send(studnets)
       } catch (error) {
        next(error)
       }
    }
}