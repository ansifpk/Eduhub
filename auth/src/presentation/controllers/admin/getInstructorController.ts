import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetInstructors } from "../../../domain/interfaces/admin/useCases/IGetInstructors";

export class GetInstructorsController implements IController {
    constructor(private readonly _useCase:IGetInstructors) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
        const instructors = await this._useCase.execute();
        res.status(StatusCodes.OK).send(instructors)
       } catch (error) {
        next(error)
       }
    }
}