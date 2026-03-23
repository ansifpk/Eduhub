import { IReport } from "../../entities/report";

export interface IUserCreateReport{
   execute(input: {
       userId: string;
       report: string;
       content: string;
       courseId: string;
     }): Promise<IReport | void> 
}