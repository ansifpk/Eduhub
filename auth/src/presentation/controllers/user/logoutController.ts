import { Request, Response } from "express";
import { IController } from "../../../shared/IController";

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
            res.send({ succuss: true, message: "logout success" });
       } catch (error) {
         console.error(error);
       }
    }
    
}