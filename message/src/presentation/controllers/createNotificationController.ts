import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { ICreateNotification } from "../../domain/interfaces/ICreateNotification";

export class CreateNotificationController implements IController {
    constructor(private readonly _userUseCase: ICreateNotification) {

    }

    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { recipientId, senderId } = req.body;
            const notifications = await this._userUseCase.execute({ recipientId, senderId })
            if (notifications) {
                res.status(StatusCodes.CREATED).send({ success: true, notifications: notifications });
            }
        } catch (error) {
            next(error)
        }
    }
}