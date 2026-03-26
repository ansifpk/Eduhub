import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IVerifyOtp } from "../../../domain/interfaces/user/useCases/IVerifyOtp";

export class VerifyOtpController implements IController {
  constructor(private readonly _useCase: IVerifyOtp) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, otp } = req.body;
      const data = await this._useCase.execute({ email, otp });
      if (data) {
        res.status(StatusCodes.OK).send({ sucess: true });
      }
    } catch (error) {
      next(error);
    }
  }
}
