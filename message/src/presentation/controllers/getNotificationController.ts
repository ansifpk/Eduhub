import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetNotification } from "../../domain/interfaces/IGetNotification";

export class GetNotificationController implements IController {
    constructor(private readonly _useCase: IGetNotification) {

    }

    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { recipientId } = req.params;
            const notifications = await this._useCase.execute({ recipientId })
            if (notifications) {
                res.status(StatusCodes.OK).send({ success: true, notifications: notifications });
            }
        } catch (error) {
            next(error)
        }
    }
}