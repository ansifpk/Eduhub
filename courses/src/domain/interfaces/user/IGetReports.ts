import { IReport } from "../../entities/report";

export interface IGetReports{
   execute(input: {
      userId: string;
      courseId: string;
    }): Promise<void | IReport[]>
}