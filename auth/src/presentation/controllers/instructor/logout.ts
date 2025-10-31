import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";

export class LogOutInstrcutorController implements IController {
    
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {      
        res.cookie('accessInstructorToken','',{
          httpOnly:true,
          expires:new Date(0)
        });
        res.cookie('refreshInstructorToken','',{
          httpOnly:true,
          expires:new Date(0)
        });
        res.clearCookie("accessInstructorToken")
        res.clearCookie("refreshInstructorToken")
        res.send({ succuss: true, message: "logout success" });
      } catch (error) {
        console.error(error);
      }
    }
}