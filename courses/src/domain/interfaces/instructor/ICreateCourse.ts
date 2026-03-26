import { ICourse } from "../../entities/course";
import { Req } from "../IReq";

export interface ICreateCourse{
    execute(input: {courseData: Req}): Promise<ICourse | void>
}