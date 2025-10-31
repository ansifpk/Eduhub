import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { CategoryRepository } from "../../infrastructure/db/repository/categoryRepository";
import { ICategory } from "../../domain/category";

export class GetCategories implements IUseCase<{next:NextFunction},ICategory[]|void> {
    constructor(private readonly categoryRepository:CategoryRepository) {
        
    }
    public async execute(input: {next:NextFunction}): Promise<ICategory[]|void> {
        try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (error) {
      console.error(error);
      input.next(error);
    }
    }
}