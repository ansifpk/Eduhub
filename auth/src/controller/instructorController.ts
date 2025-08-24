import { NextFunction, Request, Response } from "express";
import { IInstructorInterface } from "../useCase/interface/useCsesInterface/IinstructorInterface";
import {  ForbiddenError } from "@eduhublearning/common";

export class InstructorController{

    private instructorUseCase:IInstructorInterface;
    constructor(instructorUseCase:IInstructorInterface){
        this.instructorUseCase=instructorUseCase
    }

        async instructorLogin( req:Request,res:Response ,next: NextFunction) {
           try {
            const instructorAndToken = await this.instructorUseCase.instructorLogin(req.body.email,req.body.password,next);
            
            if(instructorAndToken){
              res.cookie('accessInstructorToken',instructorAndToken.token.accessToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== 'development',
                sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
                path:"/",
                maxAge: 15 * 60 * 1000
             });
              res.cookie('refreshInstructorToken',instructorAndToken.token.refreshToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== 'development',
                sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
                path:"/",
                maxAge:30 * 24 * 60 * 60 * 1000
             });
              
              res.send(instructorAndToken)
            }
           } catch (error) {
             console.error(error)
           }
        }
    async getStudnets(req:Request,res:Response,next:NextFunction){
       
        const createdUser = await this.instructorUseCase.fetchStudents()
        if(createdUser){
            return res.send({success:true,user:createdUser})
        }
    }
    
    async logout(req: Request, res: Response, next: NextFunction) {
      try {      
        res.cookie('accessInstructorToken','',{
          httpOnly:true,
          expires:new Date(0)
         });
        res.cookie('refreshInstructorToken','',{
          httpOnly:true,
          expires:new Date(0)
         });
        res.send({ succuss: true, message: "logout success" });
      } catch (error) {
        console.error(error);
      }
    }

      async checkTockens(req: Request, res: Response, next: NextFunction) {
        try {      
          if(!req.cookies.refreshInstructorToken){
             throw new ForbiddenError(  )
          }
          const tocken = req.cookies.refreshInstructorToken;
    
          const tockens  = await this.instructorUseCase.checkTockens(tocken,next)
          if(tockens){
           
            res.cookie('accessInstructorToken',tockens.accessToken,{
              httpOnly:true,
              secure:process.env.NODE_ENV !== 'development',
              sameSite:'strict',
              maxAge: 15 * 60 * 1000
           });
            res.cookie('refreshInstructorToken',tockens.refreshToken,{
              httpOnly:true,
              secure:process.env.NODE_ENV !== 'development',
              sameSite:'strict',
              maxAge:30 * 24 * 60 * 60 * 1000
           });
            return res.send({success:true,tockens});
          }
        } catch (error) {
          console.error(error);
          next(error)
        }
      }
}