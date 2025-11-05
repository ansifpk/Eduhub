import { Request, Response, NextFunction } from "express";
import { VerifyOtp } from "../../../application/user/verifyOtp";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class VerifyOtpController implements IController {
  constructor(private readonly _useCase: VerifyOtp) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp } = req.body;
      const data = await this._useCase.execute({ email, otp, next });
      if (data) {
        res.status(StatusCodes.OK).send({ sucess: true });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
