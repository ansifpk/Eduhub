import { ICategory } from "../../../category";

export interface IEditCategory{
    execute(input: {
        _id: string;
        title: string;
        description: string;
        topics: string[];
      }): Promise<ICategory | void>
}