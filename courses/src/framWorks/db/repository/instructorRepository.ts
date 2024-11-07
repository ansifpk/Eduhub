import { ICourse } from "../../../entities/course";
import { IInstructorrepository } from "../../../useCases/interfaces/repository/IInstructorRepository";
import { Course } from "../mongodb/models/courseModel";

export class InstructorRepository implements IInstructorrepository{
    constructor(private userModels:typeof Course){}
    find(): Promise<ICourse[]> {
        throw new Error("Method not implemented.");
    }
    create(courseData: ICourse): Promise<ICourse | void> {
        console.log(courseData,"in repoinstru");
        
        throw new Error("Method not implemented.");
    }
    list(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    edit(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    
}