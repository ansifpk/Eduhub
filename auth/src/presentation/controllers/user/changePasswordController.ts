import { Request, Response, NextFunction } from "express";
import { ChangePassword } from "../../../application/user/changePassword";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class ChangePasswordConstroller implements IController {
    constructor(private readonly _useCase:ChangePassword) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
      const {email,password,confirmPassword} = req.body;
      const data = await this._useCase.execute(
       { email,
        password,
        confirmPassword,
        next}
      );
      if (data) {
         res.status(StatusCodes.NO_CONTENT).send({ sucess: true });
      }
    } catch (error) {
      console.error(error);
    }
    }
}