import { ICourse } from "../../../entities/course";
import { IAdminRepository } from "../../../useCases/interfaces/repository/IAdminRepository";
import { Course } from "../mongodb/models/courseModel";

export class AdminRepository implements IAdminRepository{
    constructor(private courseModel:typeof Course){}
    async find(): Promise<ICourse[]> {
        await this.courseModel.find();
        throw new Error("Method not implemented.");
    }
    create(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    list(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    edit(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }

} 