import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IVerifyEmail } from "../../../domain/interfaces/user/useCases/IVerifyEmail";

export class VerifyEmailController implements IController {
  constructor(private readonly _useCase: IVerifyEmail) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { email } = req.body;
      const otp = await this._useCase.execute({ userId, email });
      if (otp) {
        res.status(StatusCodes.OK).send({ success: true, otp: otp });
      }
    } catch (error) {
      next(error);
    }
  }
}
