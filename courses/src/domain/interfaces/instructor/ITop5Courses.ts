import { ICourse } from "../../entities/course";

export interface ITop5Courses {
   execute(input: {
       userId: string;
     }): Promise<ICourse [] | void> 
}