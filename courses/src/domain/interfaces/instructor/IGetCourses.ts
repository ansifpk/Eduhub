import { ICourse } from "../../entities/course";

export interface IGetCourse {
   execute(input: {
       instructorId: string;
       search: string;
       sort: string;
       page: number;
     }): Promise<ICourse[] | void> 
}