import { ICategory } from "../../../category";

export interface IGetCategory {
     execute(): Promise<ICategory[] | void>
}