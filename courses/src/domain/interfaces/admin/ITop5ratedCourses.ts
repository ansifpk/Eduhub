import { ICourse } from "../../entities/course";

export interface ITop5RatedCourses{
    execute(): Promise<ICourse[] | void>
}