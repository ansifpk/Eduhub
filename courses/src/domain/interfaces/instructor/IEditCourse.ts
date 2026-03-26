import { ICourse } from "../../entities/course";
import { Req } from "../IReq";

export interface IEditCourse {
   execute(input: {
       courseId: string;
       courseData: Req;
     }): Promise<ICourse | void>
}