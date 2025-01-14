import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IAdminRepository } from "../interfaces/repositoryInterfaces/IadminRepository";
import { IAdminUseCase } from "../interfaces/useCasesInterfaces/IadminUseCase";
import ErrorHandler from "../middlewares/errorHandler";

export class AdminUseCase implements IAdminUseCase{
       constructor(private adminRepository:IAdminRepository){}

       async top5Instructors(): Promise<Iuser[] | void> {
          try {
             const instructors = await this.adminRepository.findTop5Instructors()
             if(instructors){  
              
                // await this.adminRepository.findInstructorRatings(instructors[2]._id);
                // await this.adminRepository.findInstructorRatings(instructors[3]._id);
                
                  for(let value of instructors){ 
                    const reviews = await this.adminRepository.findInstructorRatings(value._id);
                    value.reviewCount = reviews?.length;
                    console.log("value",value.reviewCount);
                  }
                  console.log(instructors[0].reviewCount);
                  
                return instructors;
             }
          } catch (error) {
            console.error(error)
          }
       }

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