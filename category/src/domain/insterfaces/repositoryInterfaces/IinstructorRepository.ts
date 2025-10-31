import { ICategory } from "../../category";

export interface IInstructorRepository{
    find():Promise<ICategory[]|void>;
    findTop5():Promise<ICategory[]|void>;
}