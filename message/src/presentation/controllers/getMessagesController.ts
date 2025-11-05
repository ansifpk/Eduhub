import { NextFunction, Request, Response } from "express";
import { GetMessages } from "../../application/useCase/GetMessages";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class GetMessagesController implements IController {
  constructor(private readonly _useCase: GetMessages) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { chatId } = req.params;

      const messages = await this._useCase.execute({ chatId, next });
      if (messages) {
        res.status(StatusCodes.OK).send({ success: true, messages: messages });
      }
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
