import { NextFunction, Request, Response } from "express";
import { IAdmin } from "../entities/admin";
import { IToken } from "../useCase/interface/serviceInterface/IJwt";
import { IadminUsecase } from "../useCase/interface/useCsesInterface/IadminUseCase";
import { accessTokenOptions } from "../framework/webServer/middlewares/tockens";
import { catchError } from "../useCase/middlewares/catchError";


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
    async blockStudent( req:Request,res:Response ,next: NextFunction) {
       try {

        const {userId} = req.params;
        const student = await this.adminUsecase.blockStudent(userId,next);
        res.send({success:true,data:student})

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
    async blockInstructor( req:Request,res:Response ,next: NextFunction) {
       try {

        const {instructorId} = req.params;
        const student = await this.adminUsecase.blockInstructor(instructorId,next);
        res.send({success:true,data:student})

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