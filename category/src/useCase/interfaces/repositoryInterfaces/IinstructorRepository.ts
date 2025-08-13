import { ICategory } from "../../../entities/category"

export interface IInstructorRepository{
    find():Promise<ICategory[]|void>;
    findTop5():Promise<ICategory[]|void>;
}