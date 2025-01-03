import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IAdminRepository } from "../interfaces/repositoryInterfaces/IadminRepository";
import { IAdminUseCase } from "../interfaces/useCasesInterfaces/IadminUseCase";
import ErrorHandler from "../middlewares/errorHandler";

export class AdminUseCase implements IAdminUseCase{
       constructor(private adminRepository:IAdminRepository){}

   async fetchInstructors(search:string,sort:string,next: NextFunction): Promise<Iuser[] | void> {
        try {
            let instructors = await this.adminRepository.findInstructors(search,sort);
        
        if(instructors){
            instructors = instructors.filter((user:Iuser)=>user.isInstructor == true || user.status == "pending")
        }

        return instructors
        } catch (error) {
            console.error(error)
        }
    }

    async fetchStudents(search:string,sort:string,next: NextFunction): Promise<Iuser[] | void> {
        try {
           
            const students = await this.adminRepository.find(search,sort)
        if(students){
        
            return students;
        }
        } catch (error) {
            console.error(error)
        }
    }

    async instructorAprovel(email: string, status: string, next: NextFunction): Promise<Iuser | void> {
       try {
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
       } catch (error) {
           console.error(error)
       }
       
    }

}