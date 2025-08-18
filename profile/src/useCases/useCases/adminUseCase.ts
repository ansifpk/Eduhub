import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IAdminRepository } from "../interfaces/repositoryInterfaces/IadminRepository";
import { IAdminUseCase } from "../interfaces/useCasesInterfaces/IadminUseCase";
import { NotFoundError } from "@eduhublearning/common";


export class AdminUseCase implements IAdminUseCase{
       constructor(private adminRepository:IAdminRepository){}

       async top5Instructors(): Promise<Iuser[] | void> {
          try {
             const instructors = await this.adminRepository.findTop5Instructors()
             if(instructors){  
                const data = instructors.filter((value)=>value.instructorReviews?.length!>0)
                let users = data.filter((value)=>value.instructorReviews?.find((val)=>val.stars>=2.5))
                if(users){
                    return users.slice(0,5)
                }
             }
          } catch (error) {
            console.error(error)
          }
       }

   async fetchInstructors(search:string,sort:string,page:number,next: NextFunction): Promise<Iuser[]|void> {
        try {
            // const count = await this.adminRepository.getInstructorPages(search,sort);
            // const pages = count as number 
            let instructors = await this.adminRepository.findInstructors(search,sort,page);
        
        if(instructors){
            // instructors = instructors.filter((user:Iuser)=>user.isInstructor == true || user.status == "pending")
            return instructors
        }
        
       
        } catch (error) {
            console.error(error)
        }
    }

    async fetchStudents(search:string,sort:string,page:number,next: NextFunction): Promise<{students:Iuser[],pages:number}|void> {
        try {
            const count = await this.adminRepository.getUserPages(search,sort);
            const pages = count as number 
            const students = await this.adminRepository.find(search,sort,page)
            if(students){
                return {students,pages};
            }
            } catch (error) {
                console.error(error)
            }
    }

    async instructorRequest(search:string,page:string,sort:string): Promise<Iuser[] | void> {
       try {
          const requests = await this.adminRepository.findIntructorRequests(search,page,sort);
          return requests
       } catch (error) {
           console.error(error)
       }
       
    }
    async instructorAprovel(email: string, status: string, next: NextFunction): Promise<Iuser | void> {
       try {
        const user = await this.adminRepository.findByEmail(email)
        if(!user){
            throw new  NotFoundError("User Not Fount")
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
           next(error)
       }
       
    }

}