import { Request, Response, NextFunction } from "express";
import { ForgetPassword } from "../../../application/user/forgetPassword";
import { IController } from "../../../shared/IController";

export class ForgetPasswordController implements IController {

    constructor(private readonly _useCase:ForgetPassword) {}

    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
     const data = await this._useCase.execute({email:req.body.email, next});
     if (data) {
        res.send({ sucess: true });
     }
   } catch (error) {
    console.error(error);
   }
    }

}