import { ICourse } from "../../entities/course";
import { IInstructorrepository } from "../interfaces/repository/IInstructorRepository";
import { IInstructorUseCase } from "../interfaces/useCases/IInstructorUseCase";

export class InstructorUseCase implements IInstructorUseCase{
    constructor(private instructorRepository:IInstructorrepository){}
    fetchCourses(): Promise<ICourse[]> {
        throw new Error("Method not implemented.");
    }
    createCourse(courseData: ICourse): Promise<ICourse | void> {
        console.log(courseData,"in instruc usecse");
        this.instructorRepository.create(courseData)
        throw new Error("Method not implemented.");
    }
    editCourse(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    listCourse(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }

}