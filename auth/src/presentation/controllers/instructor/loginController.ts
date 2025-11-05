import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { InstructorLogin } from "../../../application/instructor/instructorLogin";
import { StatusCodes } from "@eduhublearning/common";

export class LoginInstructorController implements IController{
    constructor(private readonly _useCase:InstructorLogin){}
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
            const instructorAndToken = await this._useCase.execute({email:req.body.email,password:req.body.password,next});
            
            if(instructorAndToken){
              res.cookie('accessInstructorToken',instructorAndToken.token.accessToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== 'development',
                sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
                path:"/",
                maxAge: 15 * 60 * 1000
             });
              res.cookie('refreshInstructorToken',instructorAndToken.token.refreshToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== 'development',
                sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
                path:"/",
                maxAge:30 * 24 * 60 * 60 * 1000
             });
              
              res.status(StatusCodes.OK).send(instructorAndToken)
            }
           } catch (error) {
             console.error(error)
           }
    }
    
} 