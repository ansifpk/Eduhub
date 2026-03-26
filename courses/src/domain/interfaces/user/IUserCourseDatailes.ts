import { ICourse } from "../../entities/course";

export interface IUserCourseDatailes{
   execute(input: {
       courseId: string;
     }): Promise<void | ICourse>
}