import { NextFunction } from "express";
import { ICategory } from "../../entities/category";
import { ICategoryRepository } from "../interfaces/repositoryInterfaces/IcategoryRepository";
import { ICategoryUserCase } from "../interfaces/useCasesInterfaces/IcategoryUseCases";
import ErrorHandler from "../middlewares/errorHandler";

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
      if (currentCategory) {
        const checkCategory = await this.categoryRepository.findOne(title);
        if (checkCategory) {
          if (
            checkCategory._id?.toString() === currentCategory._id?.toString()
          ) {
            const updatedCategory = await this.categoryRepository.update(
              categoryId,
              title,
              description,
              topics
            );
            return updatedCategory;
          } else {
            return next(new ErrorHandler(400, "This Category Already Exists"));
          }
        } else {
          const updatedCategory = await this.categoryRepository.update(
            categoryId,
            title,
            description,
            topics
          );
          return updatedCategory;
        }
      } else {
        return next(new ErrorHandler(400, "Category Not Fount"));
      }
    } catch (error) {
      console.error(error);
    }
  }
  async listCategory(
    subjectId: string,
    next: NextFunction
  ): Promise<ICategory | void> {
    try {
      const check = await this.categoryRepository.findById(subjectId);
      console.log("check in useusercasecategory", check);
      if (check) {
        const done = await this.categoryRepository.list(check);
        if (done) {
          return check;
        } else {
          return next(new ErrorHandler(400, "Category Not Found"));
        }
      } else {
        return next(new ErrorHandler(400, "Category Not Found"));
      }
    } catch (error) {
      console.error(error);
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
        return next(new ErrorHandler(400, "Category Already Exists"));
      } else {
        const category = await this.categoryRepository.create(data);
        return category;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
