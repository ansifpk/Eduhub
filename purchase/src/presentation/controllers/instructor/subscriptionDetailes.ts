import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstructorSubscriptionDetailes } from "../../../domain/interfaces/useCases/instructor/IInstructorSubscriptionDetailes";

export class InstructorSubscriptionDetailesController implements IController {
    constructor(private readonly _useCase:IInstructorSubscriptionDetailes) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const {customerId} = req.params;
        const sessionId =  await this._useCase.execute({customerId})
        if (sessionId) {
            res.status(StatusCodes.OK).send({success:true, url:sessionId });
          }
        } catch (error) {
            next(error)
        }
    }
}