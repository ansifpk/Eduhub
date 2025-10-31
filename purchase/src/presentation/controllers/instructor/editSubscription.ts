import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorEditSubscription } from "../../../application/instructor/editSubscription";

export class EditSubscriptionController implements IController {
    constructor(public readonly _useCase: InstructorEditSubscription) {}
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
         const {subscriptionId} = req.params;
        const {price,plan,instructorId} = req.body;
        const subscription = await this._useCase.execute({subscriptionId,price,plan:plan[0],instructorId,next})
        if(subscription){
             res.send({success:true})
        }
       } catch (error) {
        console.error(error);
        next(error);
       }
    }
}