import { ICourse } from "../../entities/course";

export interface IGetCourses{
   execute(input: {search:string,sort:string,page:number}): Promise<{courses:ICourse[],pages:number}|void>
}