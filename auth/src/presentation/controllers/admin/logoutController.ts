import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";

export class AdminLogoutController implements IController {
 
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {      
        res.cookie('accessAdminToken','',{
          httpOnly:true,
          expires:new Date(0)
        });
        res.cookie('refreshAdminToken','',{
          httpOnly:true,
          expires:new Date(0)
        });
        res.clearCookie("accessAdminToken")
        res.clearCookie("refreshAdminToken")
        res.send({ succuss: true, message: "logout success" });
      } catch (error) {
        console.error(error);
      }
    }
}