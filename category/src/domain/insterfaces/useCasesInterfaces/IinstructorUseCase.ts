import { ICategory } from "../../category";

export interface IInstructorUserCase{
     getAllCategories():Promise<ICategory[]|void>;
     topCategories():Promise<ICategory[]|void>;
}