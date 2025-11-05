import { Request, Response } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class LogOutController implements IController {

    public async handle(req: Request, res: Response): Promise<void> {
       try {
            res.cookie('accessToken','',{
                httpOnly:true,
                expires:new Date(0)
            });
            res.cookie('refreshToken','',{
                httpOnly:true,
                expires:new Date(0)
            });
            res.clearCookie("accessToken")
                res.clearCookie("refreshToken")
            res.status(StatusCodes.OK).send({ succuss: true, message: "logout success" });
       } catch (error) {
         console.error(error);
       }
    }
    
}