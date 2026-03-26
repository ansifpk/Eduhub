import { ICategory } from "../../../category";

export interface IGetCategories{
    execute():Promise<ICategory[]|void>
}