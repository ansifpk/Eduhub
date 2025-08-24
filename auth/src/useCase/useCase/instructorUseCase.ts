import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import {  IInstructorInterface } from "../interface/useCsesInterface/IinstructorInterface";
import { IInstructorRepository } from "../interface/repositoryInterface/IInstructorInterface";
import {  BadRequestError, ForbiddenError, StatusCodes } from "@eduhublearning/common";
import { Icloudinary } from "../../framework/services/cloudinary";
import { IHashPassword } from "../interface/serviceInterface/IHashPassword";



export class InstructorUseCase implements IInstructorInterface{
    
    constructor(
        private instructorRepository:IInstructorRepository,
        private cloudinary:Icloudinary,
        private jwt:IJwt,
         private encrypt: IHashPassword,
    ){}


    async instructorLogin(email: string, password: string, next: NextFunction): Promise<{ instructor: Iuser; token: IToken; } | void> {
       try {
        const instructor = await this.instructorRepository.findByEmail(email);
        if(instructor){
           if(instructor.isBlock){
             throw new ForbiddenError();
           }
           const hashPassword = await this.encrypt.comparePassword(password,instructor.password)
           if(hashPassword){
              if(instructor.isInstructor){
                const token = await this.jwt.createAccessAndRefreashToken(instructor._id!) as IToken
                return {instructor,token}
              }else{
                throw new BadRequestError( "You Are Not Instructor")
              }
           }else{
            throw new BadRequestError("Incorrect Password" )
           }
       }else{
        throw new BadRequestError("Instructor Not Found" )
       }
     } catch (error) {
        console.error(error)
        next(error)
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