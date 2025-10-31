import { IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";
import { NextFunction } from "express";
import { ICourse } from "../../domain/entities/course";

export class GetCourses implements IUseCase<{search:string,sort:string,page:number,next:NextFunction},{courses:ICourse[],pages:number}|void> {
    constructor(private readonly adminRepository:AdminRepository) {
        
    }
    public async execute(input: {search:string,sort:string,page:number,next:NextFunction}): Promise<{courses:ICourse[],pages:number}|void> {
         try {

        const count = await this.adminRepository.getPages(input.search,input.sort);
        const pages = count as number 
        const courses = await this.adminRepository.find(input.search,input.sort,input.page)
      
        if(courses && pages>=0) {
            return {courses,pages}
        }
      } catch (error) {
        console.error(error)
        input.next(error)
      }
    }
}