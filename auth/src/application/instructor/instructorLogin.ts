import { BadRequestError, ErrorMessages, ForbiddenError } from "@eduhublearning/common";
import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { Iuser } from "../../domain/entities/user";
import { IInstructorLogin } from "../../domain/interfaces/instructor/useCases/IInstructorLogin";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";
import { IInstructorRepository } from "../../domain/interfaces/instructor/repositories/IInstructorRepository";

export class InstructorLogin implements IInstructorLogin{
    constructor(
        private readonly instructorRepository:IInstructorRepository,
        private readonly encrypt:IHashPassword,
        private readonly jwt:IJwt,
    ){}
    public async execute(input: {email: string, password: string}): Promise<{ instructor: Iuser; token: IToken; } | void> {
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
                       throw new BadRequestError(ErrorMessages.NOT_INSTRUCTOR)
                     }
                  }else{
                   throw new BadRequestError(ErrorMessages.INVALID_CREDENCIALS)
                  }
              }else{
               throw new BadRequestError(ErrorMessages.INVALID_CREDENCIALS)
              }
            } catch (error) {
               console.error(error)
               throw error;
           }
    }

}