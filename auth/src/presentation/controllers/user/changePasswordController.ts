import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IChangePassword } from "../../../domain/interfaces/user/useCases/IChangePassword";

export class ChangePasswordConstroller implements IController {
    constructor(private readonly _useCase:IChangePassword) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
      const {email,password,confirmPassword} = req.body;
      const data = await this._useCase.execute(
       { email,
        password,
        confirmPassword,
        }
      );
      if (data) {
         res.status(StatusCodes.NO_CONTENT).send({ sucess: true });
      }
    } catch (error) {
      next(error)
    }
    }
}