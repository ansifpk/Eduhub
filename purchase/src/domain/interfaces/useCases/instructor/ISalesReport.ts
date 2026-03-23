import exceljs from "exceljs";

export interface ISalesReport{
   execute(input: {
       instructorId: string;
       start: string;
       end: string;
     }): Promise<exceljs.Workbook | void> 
}