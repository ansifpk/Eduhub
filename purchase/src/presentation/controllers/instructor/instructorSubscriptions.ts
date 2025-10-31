import { IController } from "@eduhublearning/common";
import { InstructorSubscriptions } from "../../../application/instructor/instructorSubscriptions";
import { Request, Response, NextFunction } from "express";

export class InstructorsSubscriptionController implements IController {
    constructor(private readonly _useCase:InstructorSubscriptions) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const {userId} = req.params
        const subscriptions = await this._useCase.execute({instructorId:userId,next})
        if(subscriptions){
             res.send({success:true,subscriptions})
        }
        } catch (error) {
            next(error);
            console.error(error);
        }
    }
}