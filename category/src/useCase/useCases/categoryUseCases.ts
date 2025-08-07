import { NextFunction } from "express";
import { ICategory } from "../../entities/category";
import { ICategoryRepository } from "../interfaces/repositoryInterfaces/IcategoryRepository";
import { ICategoryUserCase } from "../interfaces/useCasesInterfaces/IcategoryUseCases";
import {  BadRequestError, NotFoundError, StatusCodes } from "@eduhublearning/common";


export class CategoryUseCase implements ICategoryUserCase {
  constructor(private categoryRepository: ICategoryRepository) {}
  async editCategory(
    categoryId: string,
    title: string,
    description: string,
    topics: string[],
    next: NextFunction
  ): Promise<ICategory | void> {
    try {
      const currentCategory = await this.categoryRepository.findById(
        categoryId
      );
   
      if(!currentCategory){
         throw new  NotFoundError("Category Not Fount")
      }
      const checkCategory = await this.categoryRepository.findOne(title);

      if(checkCategory && checkCategory._id?.toString() !== currentCategory._id?.toString()){
          throw new  BadRequestError("This Category Already Exists")
      }
      console.log("add akkam");
       const updatedCategory = await this.categoryRepository.update(
              categoryId,
              title,
              description,
              topics
            );
            return updatedCategory;
   
   
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
  async listCategory(
    subjectId: string,
    next: NextFunction
  ): Promise<ICategory | void> {
    try {
      const check = await this.categoryRepository.findById(subjectId);
      
      if (check) {
        const done = await this.categoryRepository.list(check);
        if (done) {
          return check;
        } else {
          throw new  NotFoundError("Category Not Fount")
        
        }
      } else {
        throw new  NotFoundError("Category Not Fount")
      }
    } catch (error) {
      console.error(error);
      next(error)
    }
  }

  async getAllCategories(): Promise<ICategory[] | void> {
    try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (error) {
      console.error(error);
    }
  }
  async createCategory(
    data: ICategory,
    next: NextFunction
  ): Promise<ICategory | void> {
    try {
      const check = await this.categoryRepository.findOne(data.title);
      if (check) {
        throw new  BadRequestError("This Category Already Exists")
           
      } else {
        const category = await this.categoryRepository.create(data);
        return category;
      }
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
