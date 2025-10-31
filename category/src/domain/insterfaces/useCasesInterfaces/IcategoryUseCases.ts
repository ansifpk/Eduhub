import { NextFunction } from "express";
import { ICategory } from "../../category";

export interface ICategoryUserCase{

     getAllCategories():Promise<ICategory[]|void>;
     createCategory(data:ICategory,next:NextFunction):Promise<ICategory|void>;
     editCategory(categoryId:string,title:string,description:string,topics:string[],next:NextFunction):Promise<ICategory|void>;
     listCategory(subjectId:string,next:NextFunction):Promise<ICategory|void>
     
}