import { ICourse } from "../../entities/course";

export interface IUserGetCourses{
  execute(input: {
      category: string;
      topic: string;
      level: string;
      search: string;
      sort: string;
      page: number;
    }): Promise<void | { courses: ICourse[]; pages: number }>
}