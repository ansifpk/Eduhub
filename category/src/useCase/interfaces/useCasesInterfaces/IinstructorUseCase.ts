import { ICategory } from "../../../entities/category"

export interface IInstructorUserCase{
     getAllCategories():Promise<ICategory[]|void>;
}