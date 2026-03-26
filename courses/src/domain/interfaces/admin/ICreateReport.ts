import { IReport } from "../../entities/report";

export interface ICreateReport{
    execute(): Promise<IReport[] | void>
}