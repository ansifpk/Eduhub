import { NextFunction, Request, Response } from "express";
import { IAdmin } from "../entities/admin";
import { IToken } from "../useCase/interface/serviceInterface/IJwt";
import { IadminUsecase } from "../useCase/interface/useCsesInterface/IadminUseCase";
import { accessTokenOptions } from "../framework/webServer/middlewares/tockens";
import { catchError } from "../useCase/middlewares/catchError";
import { UserBlcokedPublisher } from "../framework/webServer/config/kafka/producer/user-block-publisher";
import kafkaWrapper from "../framework/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";


export class AdminController{
    private adminUsecase: IadminUsecase;
    constructor(adminUsecase:IadminUsecase){
        this.adminUsecase=adminUsecase
    }
    async adminLogin( req:Request,res:Response ,next: NextFunction) {
       try {
        const adminAndToken = await this.adminUsecase.adminLogin(req.body.email,req.body.password,next);
        if(adminAndToken){
          req.session={accessToken:adminAndToken.token.accessToken}
          res.send(adminAndToken)
        }
       } catch (error) {
         catchError(error,next)
       }
    }

    async showStudents( req:Request,res:Response ,next: NextFunction) {
       try {
        const studnets = await this.adminUsecase.fetchStudents();
        res.send(studnets)
       } catch (error) {
         catchError(error,next)
       }
    }
  
    async showInstructors( req:Request,res:Response ,next: NextFunction) {
       try {
        const instructors = await this.adminUsecase.fetchInstructors();
        res.send(instructors)
       } catch (error) {
         catchError(error,next)
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
         catchError(error,next)
       }
    }
    async editProfile( req:Request,res:Response ,next: NextFunction) {
       try {
          const user = await this.adminUsecase.editProfile(req.body.adminId,req.body.name,req.body.email,next)
          if(user){
            return res.send({success:true,admin:user});
          }
       } catch (error) {
         catchError(error,next)
       }
    }

}