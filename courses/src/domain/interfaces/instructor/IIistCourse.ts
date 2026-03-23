import { ICourse } from "../../entities/course";

export interface IListCourse {
    execute(input: {
        courseId: string;
      }): Promise<ICourse | void> 
}