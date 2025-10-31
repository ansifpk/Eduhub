import { NextFunction } from "express";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { Encrypt } from "../../infrastructure/services/hashPassword";

export class AdminLogin implements IUseCase<{email:string,password:string,next:NextFunction},any|void> {
    constructor(
        private readonly _adminRepository:AdminRepository,
        private readonly _jwt:JWTtocken,
        private readonly _encrypt:Encrypt,
    ) {
        
    }
    public async execute(input: {email:string,password:string,next:NextFunction}): Promise<any> {
       try {
                const admin = await this._adminRepository.findByEmail(input.email);
                if(admin){
                   const hashPassword = await this._encrypt.comparePassword(input.password,admin.password)
                   if(hashPassword){
                      if(admin.isAdmin){
                        const token = await this._jwt.createAccessAndRefreashToken(admin._id!) as IToken
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
               input.next(error)
               
              }
    }
}