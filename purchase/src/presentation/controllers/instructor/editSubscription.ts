import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstructorEditSubscription } from "../../../domain/interfaces/useCases/instructor/IInstructorEditSubscription";

export class EditSubscriptionController implements IController {
    constructor(public readonly _useCase: IInstructorEditSubscription) {}
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
         const {subscriptionId} = req.params;
        const {price,plan,instructorId} = req.body;
        const subscription = await this._useCase.execute({subscriptionId,price,plan:plan[0],instructorId})
        if(subscription){
             res.status(StatusCodes.NO_CONTENT).send({success:true})
        }
       } catch (error) {
        next(error);
       }
    }
}