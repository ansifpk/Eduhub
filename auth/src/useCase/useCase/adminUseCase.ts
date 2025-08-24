import { NextFunction } from "express";
import { IAdmin } from "../../entities/admin";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import { IadminUsecase } from "../interface/useCsesInterface/IadminUseCase";
import {  BadRequestError } from "@eduhublearning/common";
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
     try {
       const currentUser = await this.adminRepository.findById(instructorId);
       if(currentUser){
         const checkUser = await this.adminRepository.findByEmail(email);
         if(checkUser){ 
            if(currentUser._id?.toString()===checkUser._id?.toString()){
             const updatedUser = await this.adminRepository.update(instructorId,name,email)
             return updatedUser
            }
         }else{
           const updatedUser = await this.adminRepository.update(instructorId,name,email)
           return updatedUser
         }
       }
     } catch (error) {
      console.log(error);
      next(error)
      
     }
  }
    async adminLogin(email: string, password: string, next: NextFunction): Promise<{ admin: IAdmin; token: IToken; } | void> {
       try {
         const admin = await this.adminRepository.findByEmail(email);
         if(admin){
            const hashPassword = await this.encrypt.comparePassword(password,admin.password)
            if(hashPassword){
               if(admin.isAdmin){
                 const token = await this.jwt.createAccessAndRefreashToken(admin._id!) as IToken
                 return {token,admin}
               }else{
                 throw new BadRequestError("You Are Not Admin" )
                 
               }
            }else{
             throw new BadRequestError("Incorrect Password" )
            
            }
         }else{
           throw new BadRequestError( "Not Registered")
     
         }
       } catch (error) {
        console.log(error);
        next(error)
        
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

     try {
      
        const check = await this.adminRepository.findById(userId)
        if(check){
          const data = await this.adminRepository.block(check)
          if(data){
            
            return data;
          }
        }else{
         throw new BadRequestError("User Not Found")
        }
     } catch (error) {
      console.log(error);
      next(error)
      
     }
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