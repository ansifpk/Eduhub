import { ICategory } from "../../../category";

export interface IListCatgory{
   execute(input: {
       _id: string;
     }): Promise<ICategory | void>
}