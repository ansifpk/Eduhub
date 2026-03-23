import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { ISendOtp } from "../../../domain/interfaces/user/useCases/ISendOtp";


export class ResendOtpController implements IController {
  constructor(private readonly _useCase: ISendOtp) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this._useCase.execute({ email: req.body.email });
      res.status(StatusCodes.OK).send({
        success: true,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
}
