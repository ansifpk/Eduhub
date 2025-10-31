import { Request, Response, NextFunction } from "express";
import { VerifyEmail } from "../../../application/user/verifyEmail";
import { IController } from "../../../shared/IController";

export class VerifyEmailController implements IController {
  constructor(private readonly _useCase: VerifyEmail) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { email } = req.body;
      const otp = await this._useCase.execute({ userId, email, next });
      if (otp) {
        res.send({ success: true, otp: otp });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
