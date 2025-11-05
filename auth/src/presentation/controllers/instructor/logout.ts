import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

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
        res.status(StatusCodes.OK).send({ succuss: true, message: "logout success" });
      } catch (error) {
        console.error(error);
      }
    }
}