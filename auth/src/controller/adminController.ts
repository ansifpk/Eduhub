import { NextFunction, Request, Response } from "express";
import { IadminUsecase } from "../useCase/interface/useCsesInterface/IadminUseCase";
import kafkaWrapper from "../framework/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { ForbiddenError, UserBlcokedPublisher } from "@eduhublearning/common";

export class AdminController{
    private adminUsecase: IadminUsecase;
    constructor(adminUsecase:IadminUsecase){
        this.adminUsecase=adminUsecase
    }
    async adminLogin( req:Request,res:Response ,next: NextFunction) {
       try {
        const adminAndToken = await this.adminUsecase.adminLogin(req.body.email,req.body.password,next);
        if(adminAndToken){
          res.cookie('accessAdminToken',adminAndToken.token.accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge: 15 * 60 * 1000
         });
          res.cookie('refreshAdminToken',adminAndToken.token.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:30 * 24 * 60 * 60 * 1000
         });
          
          res.send(adminAndToken)
        }
       } catch (error) {
         next(error)
       }
    }

    async showStudents( req:Request,res:Response ,next: NextFunction) {
       try {
        const studnets = await this.adminUsecase.fetchStudents();
        res.send(studnets)
       } catch (error) {
        next(error)
       }
    }
  
    async showInstructors( req:Request,res:Response ,next: NextFunction) {
       try {
        const instructors = await this.adminUsecase.fetchInstructors();
        res.send(instructors)
       } catch (error) {
        next(error)
       }
    }
    async blockUser( req:Request,res:Response ,next: NextFunction) {
       try {

        const {userId} = req.params;
        const user = await this.adminUsecase.blockUser(userId,next);
        
        
        if(user){
          await new UserBlcokedPublisher(kafkaWrapper.producer as Producer).produce({
            _id: user._id!,
            isBlock: user.isBlock!
          })
          res.send({success:true,data:user})
        }
       

       } catch (error) {
        next(error)
       }
    }
    async editProfile( req:Request,res:Response ,next: NextFunction) {
       try {
          const user = await this.adminUsecase.editProfile(req.body.adminId,req.body.name,req.body.email,next)
          if(user){
            return res.send({success:true,admin:user});
          }
       } catch (error) {
        next(error)
       }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
      try {      
        res.cookie('accessAdminToken','',{
          httpOnly:true,
          expires:new Date(0)
         });
        res.cookie('refreshAdminToken','',{
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
          if(!req.cookies.refreshAdminToken){
            throw new ForbiddenError()
          }
          const tocken = req.cookies.refreshAdminToken;
    
          const tockens  = await this.adminUsecase.checkTockens(tocken,next)
          if(tockens){
           
            res.cookie('accessAdminToken',tockens.accessToken,{
              httpOnly:true,
              secure:process.env.NODE_ENV !== 'development',
              sameSite:'strict',
              maxAge: 15 * 60 * 1000
           });
            res.cookie('refreshAdminToken',tockens.refreshToken,{
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