import { ICourse } from "../../domain/entities/course";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";
import { IGetCourses } from "../../domain/interfaces/admin/IGetCourses";

export class GetCourses implements IGetCourses {
    constructor(private readonly adminRepository:IAdminRepository) {
        
    }
    public async execute(input: {search:string,sort:string,page:number}): Promise<{courses:ICourse[],pages:number}|void> {
         try {

        const count = await this.adminRepository.getPages(input.search,input.sort);
        const pages = count as number 
        const courses = await this.adminRepository.find(input.search,input.sort,input.page)
      
        if(courses && pages>=0) {
            return {courses,pages}
        }
      } catch (error) {
        console.error(error)
        throw error;
      }
    }
}