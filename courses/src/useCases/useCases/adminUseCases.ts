import { ICourse } from "../../entities/course";
import { IAdminRepository } from "../interfaces/repository/IAdminRepository";
import { IAdminUseCase } from "../interfaces/useCases/IadminUseCase";

export class AdminUseCase implements IAdminUseCase{
    constructor(private adminRepository:IAdminRepository,){}
    async fetchCourses(): Promise<ICourse[]> {
       const courses = await this.adminRepository.find()
       return courses
    }
    createCourse(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    editCourse(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    listCourse(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    
} 