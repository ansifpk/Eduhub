import { ICourse } from "../../entities/course";

export interface IPurchasedCourses{
    execute(input: {
    userId: string;
  }): Promise<void | ICourse[]> 
}