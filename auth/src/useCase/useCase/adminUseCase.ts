import { NextFunction } from "express";
import { IAdmin } from "../../entities/admin";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import { IadminUsecase } from "../interface/useCsesInterface/IadminUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import { IHashPassword } from "../interface/serviceInterface/IHashPassword";
import { IAdminRepository } from "../interface/repositoryInterface/IAdminRepository";
import { Iuser } from "../../entities/user";


export class AdminUsecase implements IadminUsecase{

    constructor( 
       private adminRepository:IAdminRepository,
       private encrypt:IHashPassword,
       private jwt:IJwt,
    ){}

  async editProfile(instructorId: string, name: string, email: string, next: NextFunction): Promise<Iuser | void> {
      const currentUser = await this.adminRepository.findById(instructorId);
      if(currentUser){
        const checkUser = await this.adminRepository.findByEmail(email);
        if(checkUser){ 
           if(currentUser._id?.toString()===checkUser._id?.toString()){
            const updatedUser = await this.adminRepository.update(instructorId,name,email)
            return updatedUser
           }else{
            return next(new ErrorHandler(400,"Email ALready Registered"))
           }
        }else{
          const updatedUser = await this.adminRepository.update(instructorId,name,email)
          return updatedUser
        }
      }else{
        return next(new ErrorHandler(400,"Admin Not Fount"))
      }
  }
    async adminLogin(email: string, password: string, next: NextFunction): Promise<{ admin: IAdmin; token: IToken; } | void> {
        const admin = await this.adminRepository.findByEmail(email);
        if(admin){
           const hashPassword = await this.encrypt.comparePassword(password,admin.password)
           if(hashPassword){
              if(admin.isAdmin){
                const token = await this.jwt.createAccessAndRefreashToken(admin._id!) as IToken
                return {token,admin}
              }else{
                return next(new ErrorHandler(400,"You Are Not Admin"))
              }
           }else{
            return next(new ErrorHandler(400,"Incorrect Password"))
           }
        }else{
            return next(new ErrorHandler(400,"Not Registered"))
        }
    }
    async fetchStudents(): Promise<Iuser[]| void> {
        const users = await this.adminRepository.find();
        return users;
    }
   
    async fetchInstructors(): Promise<Iuser[] | void> {
       const users = await this.adminRepository.find();
       if(users){
         const instructors = users.filter((value:Iuser) => value.isInstructor == true);
         return instructors;
       }
    }
    async blockUser(userId: string, next: NextFunction): Promise<Iuser | void> {

     
       const check = await this.adminRepository.findById(userId)
       if(check){
         const data = await this.adminRepository.block(check)
         return data;
       }else{
        return next(new ErrorHandler(400,"User Not Found"))
       }
    }
}