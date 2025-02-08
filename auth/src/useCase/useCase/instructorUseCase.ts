import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import {  IInstructorInterface } from "../interface/useCsesInterface/IinstructorInterface";
import { IInstructorRepository } from "../interface/repositoryInterface/IInstructorInterface";
import { ErrorHandler, StatusCodes } from "@eduhublearning/common";
import { Icloudinary } from "../../framework/services/cloudinary";
import { IHashPassword } from "../interface/serviceInterface/IHashPassword";



export class InstructorUseCase implements IInstructorInterface{
    
    constructor(
        private instructorRepository:IInstructorRepository,
        private cloudinary:Icloudinary,
        private jwt:IJwt,
         private encrypt: IHashPassword,
    ){}
    async instructorRegister(email: string, name: string,qualification: string, expirience: string, certificate: string, cv: string, next: NextFunction): Promise<{ user: Iuser; token: IToken; } | void> {
       
         
        const userNew = await this.instructorRepository.findByEmail(email) as Iuser;
       if(userNew){
            const user = await this.instructorRepository.makeInstructor(email)
            if(user){
                const token = await this.jwt.createAccessAndRefreashToken(user._id!) as IToken
                if(token){
                    if(user.isBlock){
                        return next(new ErrorHandler(StatusCodes.FORBIDDEN,"You are blocked by Admin"))
                    }
                   
                    return {user,token}
                }
            }else{
                return next(new ErrorHandler(StatusCodes.NOT_FOUND,"Not fount user"))
            }
           
            
       }
    }
   
    async editProfile(instructorId: string, email: string, name: string, next: NextFunction): Promise<Iuser | void> {
       const currentUser = await this.instructorRepository.findById(instructorId)
       if(currentUser){
        
          const checkUser = await this.instructorRepository.findByEmail(email)
          if(checkUser){
              if(checkUser._id?.toString() === currentUser._id?.toString()){
                 const updatedUser = await this.instructorRepository.update(instructorId,email,name)
                 return updatedUser;
              }else{
                return next(new ErrorHandler(StatusCodes.CONFLICT,"Email Already Registered"))
              }
          }else{
            const updatedUser = await this.instructorRepository.update(instructorId,email,name)
            return updatedUser;
        }
       }else{
        return next(new ErrorHandler(StatusCodes.NOT_FOUND,"User Not Fount"))
       }
    }

    async instructorLogin(email: string, password: string, next: NextFunction): Promise<{ instructor: Iuser; token: IToken; } | void> {
       try {
        const instructor = await this.instructorRepository.findByEmail(email);
        if(instructor){
           const hashPassword = await this.encrypt.comparePassword(password,instructor.password)
           if(hashPassword){
              if(instructor.isInstructor){
                const token = await this.jwt.createAccessAndRefreashToken(instructor._id!) as IToken
                return {instructor,token}
              }else{
                return next(new ErrorHandler(StatusCodes.BAD_REQUEST,"You Are Not Instructor"))
              }
           }else{
            return next(new ErrorHandler(StatusCodes.BAD_REQUEST,"Incorrect Password"))
           }
       }else{
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST,"Instructor Not Found"))
       }
     } catch (error) {
        console.error(error)
    }
   }
    async fetchStudents(): Promise<Iuser[]| void> {
        const users = await this.instructorRepository.find();
        return users;
    }

    async checkTockens(tocken:string,next: NextFunction): Promise<IToken | void> {
        try {
          const decoded = await this.jwt.verifyRefreshJwt(tocken)
          
          if(decoded){
           const tockens =  await this.jwt.createAccessAndRefreashToken(decoded.id);
           if(tockens){
            return tockens
           }
          }
          
        } catch (error) {
          console.error(error)
        }
      }

}