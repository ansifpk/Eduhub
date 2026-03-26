import exceljs from "exceljs";

export interface IAdminSalesRepost{
    execute(input: {
        start: string;
        end: string;
      }): Promise<exceljs.Workbook | void>
}