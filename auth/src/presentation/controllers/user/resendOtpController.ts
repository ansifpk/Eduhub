import { Request, Response, NextFunction } from "express";
import { SendOtp } from "../../../application/user/sendOtp";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";


export class ResendOtpController implements IController {
  constructor(private readonly _useCase: SendOtp) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this._useCase.execute({ email: req.body.email, next });
      res.status(StatusCodes.OK).send({
        success: true,
        data: data,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
