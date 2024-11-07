import { ICategory } from "../../../entities/category"

export interface ICategoryRepository{
    find():Promise<ICategory[]|void>;
    findById(id:string):Promise<ICategory|void>;
    findOne(name:string):Promise<ICategory|void>;
    create(data:ICategory):Promise<ICategory|void>;
    update(categoryId: string, title: string, description: string, topics: string[]):Promise<ICategory|void>;
    list(category:ICategory):Promise<ICategory>;

}