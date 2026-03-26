import { ICategory } from "../../../category";

export interface IAddCategory{
    execute(input: {
       data: ICategory;
     }): Promise<ICategory|void> 
}