import { NextFunction } from "express";
import { IUserUseCase } from "../interfaces/useCasesInterfaces/IuserUseCases";
import { Iuser } from "../../entities/user";
import { IUserRepository } from "../interfaces/repositoryInterfaces/IuserRepository";


export class UserUseCases implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository,
    ){}
   

    createProfile(userData: Iuser, next: NextFunction): Promise<Iuser | void> {
        console.log(userData,"form kafka");
        
        throw new Error("Method not implemented.");
    }

   async userProfile(userId: string, next: NextFunction): Promise<Iuser | void> {
        try {
            // const user = await this.instructor
        } catch (error) {
            console.error(error)
        }
    }

  
}