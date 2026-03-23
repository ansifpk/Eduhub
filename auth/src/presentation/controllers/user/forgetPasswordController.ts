import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IForgetPassword } from "../../../domain/interfaces/user/useCases/IForgetPassword";

export class ForgetPasswordController implements IController {

    constructor(private readonly _useCase:IForgetPassword) {}

    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
     const data = await this._useCase.execute({email:req.body.email});
     if (data) {
        res.status(StatusCodes.NO_CONTENT).send({ sucess: true });
     }
   } catch (error) {
    next(error);
   }
    }

}