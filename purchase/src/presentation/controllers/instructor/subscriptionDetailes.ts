import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorSubscriptionDetailes } from "../../../application/instructor/subscriptionDetailes";

export class InstructorSubscriptionDetailesController implements IController {
    constructor(private readonly _useCase:InstructorSubscriptionDetailes) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const {customerId} = req.params;
        const sessionId =  await this._useCase.execute({customerId,next})
        if (sessionId) {
            res.send({success:true, url:sessionId });
          }
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}