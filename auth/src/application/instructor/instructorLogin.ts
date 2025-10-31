import { BadRequestError, ForbiddenError } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { IUseCase } from "../../shared/IUseCase";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { Encrypt } from "../../infrastructure/services/hashPassword";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class InstructorLogin implements IUseCase<{email: string, password: string, next: NextFunction},{ instructor: Iuser; token: IToken; } | void>{
    constructor(
        private readonly instructorRepository:InstructorRepository,
        private readonly encrypt:Encrypt,
        private readonly jwt:JWTtocken,
    ){}
    public async execute(input: {email: string, password: string, next: NextFunction}): Promise<{ instructor: Iuser; token: IToken; } | void> {
       try {
               const instructor = await this.instructorRepository.findByEmail(input.email);
               if(instructor){
                  if(instructor.isBlock){
                    throw new ForbiddenError();
                  }
                  const hashPassword = await this.encrypt.comparePassword(input.password,instructor.password)
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
               input.next(error)
           }
    }

}