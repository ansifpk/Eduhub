import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import {  IInstructorRepository } from "../interfaces/repositoryInterfaces/IinstructorInterface";
import { ICloudinary } from "../interfaces/serviceInterfaces/ICloudinery";
import { IInstructorUseCase } from "../interfaces/useCasesInterfaces/IinstructorUsecase";

import { IRating } from "../../entities/ratings";
import { ErrorHandler, StatusCodes } from "@eduhublearning/common";

  interface Req {
  bodyData:{
    email:string,
    name:string,
    qualification:string,
    isInstructor:boolean,
    experience:string,
    cv:{
        id:string,
        cv_url:string
    },
    certificate:{
        id:string,
        certificate_url:string
    },
    avatar:{
        id:string,
        avatar_url:string
    },
   },
   fileData:{ 
    certificateImage?: Express.Multer.File[], 
    cvImage?: Express.Multer.File[] 
  }
  }
export class InstructorUseCase implements IInstructorUseCase{

    constructor(
        private instructorRepository:IInstructorRepository,
        private cloudinary:ICloudinary,
    ){}
    async ratings(userId: string, next: NextFunction): Promise<IRating[] | void> {
       try {
        const reports = await this.instructorRepository.findRatings(userId);
        if(reports){
            return reports;
        }
       } catch (error) {
        console.error(error)
       }
    }
    async register(userData:Req,next:NextFunction): Promise<Iuser | void> {
        
        const user = await this.instructorRepository.findByEmail(userData.bodyData.email)
        if(!user){
             return next(new ErrorHandler(StatusCodes.NOT_FOUND, "user not registered"))
        }
         if(user.isBlock){
            return next(new ErrorHandler(StatusCodes.FORBIDDEN,"user are blocked by admin"))
         }
         if(user.isInstructor){
            return next(new ErrorHandler(StatusCodes.BAD_REQUEST,"you are already registered as instructor"))
         }
         if(user.status == "pending" ){
            return next(new ErrorHandler(StatusCodes.BAD_REQUEST,"your instructor request is in pending..."))
         }

           const certificate =  await this.cloudinary.addFile(userData.fileData.certificateImage![0])
           const cv =  await this.cloudinary.addFile(userData.fileData.cvImage![0])
            if(certificate&&cv){
                userData.bodyData.certificate = {
                    id:certificate.public_id,
                    certificate_url:certificate.secure_url
                }
                userData.bodyData.cv = {
                    id:cv.public_id,
                    cv_url:cv.secure_url
                }
               userData.bodyData.isInstructor = true;

               const updatedUser =  await this.instructorRepository.update({
                email: userData.bodyData.email,
                certificate: userData.bodyData.certificate,
                cv: userData.bodyData.cv,
                qualification: userData.bodyData.qualification,
                experience: userData.bodyData.experience
            })
  
             if(updatedUser){
            
              return updatedUser;
              
             }
                
            }
    }


    
}