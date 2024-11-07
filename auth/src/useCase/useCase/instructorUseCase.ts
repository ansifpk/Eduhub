import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import { IInstructor, IInstructorInterface } from "../interface/useCsesInterface/IinstructorInterface";
import { IInstructorRepository } from "../interface/repositoryInterface/IInstructorInterface";
import ErrorHandler from "../middlewares/errorHandler";
import { Icloudinary } from "../../framework/services/cloudinary";



export class InstructorUseCase implements IInstructorInterface{
    
    constructor(
        private instructorRepository:IInstructorRepository,
        private cloudinary:Icloudinary,
        private jwt:IJwt,
    ){}
    async instructorRegister(email: string, name: string,qualification: string, expirience: string, certificate: string, cv: string, next: NextFunction): Promise<{ user: Iuser; token: IToken; } | void> {
         console.log(email,name,qualification,expirience,certificate,cv);
         
        const userNew = await this.instructorRepository.findByEmail(email) as Iuser;
       if(userNew){
            const user = await this.instructorRepository.makeInstructor(email)
            if(user){
                const token = await this.jwt.createAccessAndRefreashToken(email) as IToken
                if(token){
                    if(user.isBlock){
                        return next(new ErrorHandler(400,"You are blocked by Admin"))
                    }
                    // console.log(user)
                    return {user,token}
                }
            }else{
                return next(new ErrorHandler(400,"Not fount user"))
            }
           
            
       }else{
    //     const user = await this.instructorRepository.create({email,name,qualification,expirience,certificate,cv}) as Iuser
    //     const token = await this.jwt.createAccessAndRefreashToken(email) as IToken
    //     return {user,token}

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
                return next(new ErrorHandler(400,"Email Already Registered"))
              }
          }else{
            const updatedUser = await this.instructorRepository.update(instructorId,email,name)
            return updatedUser;
        }
       }else{
        return next(new ErrorHandler(400,"User Not Fount"))
       }
    }

    instructorLogin(email: string, password: string, next: NextFunction): Promise<{ user: Iuser; token: IToken; } | void> {
        throw new Error("Method not implemented.");
    }

}