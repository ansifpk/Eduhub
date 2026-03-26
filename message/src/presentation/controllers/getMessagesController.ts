import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetMessages } from "../../domain/interfaces/IGetMessages";

export class GetMessagesController implements IController {
  constructor(private readonly _useCase: IGetMessages) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { chatId } = req.params;

      const messages = await this._useCase.execute({ chatId });
      if (messages) {
        res.status(StatusCodes.OK).send({ success: true, messages: messages });
      }
    } catch (error) {
      next(error)
    }
  }
}
