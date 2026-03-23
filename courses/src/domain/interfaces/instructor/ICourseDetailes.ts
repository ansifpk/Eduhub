import { ICourse } from "../../entities/course";

export interface IInstructorCourseDetailes{
   execute(input: {
       courseId: string;
     }): Promise<ICourse | void>
}