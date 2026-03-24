import { Request, Response } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class LogOutController implements IController {

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: process.env.NODE_ENV == 'development' ? 'strict' : 'none',
                path: '/',
            });

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: process.env.NODE_ENV == 'development' ? 'strict' : 'none',
                path: '/',
            });
            res.status(StatusCodes.OK).send({ succuss: true, message: "logout success" });
        } catch (error) {
            console.error(error);
        }
    }

}