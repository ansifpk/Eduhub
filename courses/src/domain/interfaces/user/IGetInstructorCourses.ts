import { ICourse } from "../../entities/course";

export interface IGetInstructorCourses{
    execute(input: {
       instructorId: string;
     }): Promise<ICourse[] | void>
}