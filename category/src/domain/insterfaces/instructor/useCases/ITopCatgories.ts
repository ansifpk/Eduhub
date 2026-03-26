import { ICategory } from "../../../category";

export interface ITopCategories {
    execute(): Promise<void | ICategory[]>
}