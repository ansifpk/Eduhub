import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IAdminRepository } from "../interfaces/repositoryInterfaces/IadminRepository";
import { IAdminUseCase } from "../interfaces/useCasesInterfaces/IadminUseCase";
import ErrorHandler from "../middlewares/errorHandler";

export class AdminUseCase implements IAdminUseCase{
       constructor(private adminRepository:IAdminRepository){}

   async fetchInstructors(next: NextFunction): Promise<Iuser[] | void> {
        let instructors = await this.adminRepository.find();
        
        if(instructors){
            instructors = instructors.filter((user:Iuser)=>user.isInstructor == true || user.status == "pending")
        }

        return instructors
    }

    async fetchStudents(next: NextFunction): Promise<Iuser[] | void> {
        const students = await this.adminRepository.find()
        if(students){
            console.log(students);
            
        }
    }

    async instructorAprovel(email: string, status: string, next: NextFunction): Promise<Iuser | void> {
        const user = await this.adminRepository.findByEmail(email)
        if(!user){
           return next(new ErrorHandler(400,"User Not Fount"));
        }
         let updatedUser 
        if(status == "Rejected"){
            updatedUser = await this.adminRepository.approveIntructor(email,status,false)
      
             
            return updatedUser;
        }else{
    
            updatedUser = await this.adminRepository.approveIntructor(email,status,true)
            return updatedUser;
        }
       
        
    }

}