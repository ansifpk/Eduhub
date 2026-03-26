import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IMarkAsRead } from "../../domain/interfaces/IMarkAsRead";

export class MarkAsReadController implements IController {
   constructor(private readonly _useCase: IMarkAsRead) {

   }

   public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { senderId, userId } = req.params;
         const notifications = await this._useCase.execute({ userId, senderId })
         if (notifications) {
            res.status(StatusCodes.OK).send({ success: true, notifications: notifications });
         }
      } catch (error) {
         next(error)
      }
   }
}