import { ICategory } from "../../domain/category";
import { IGetCategories } from "../../domain/insterfaces/admin/useCases/IGetCategories";
import { ICategoryRepository } from "../../domain/insterfaces/repositoryInterfaces/IcategoryRepository";

export class GetCategories implements IGetCategories {
    constructor(private readonly categoryRepository:ICategoryRepository) {
        
    }
    public async execute(): Promise<ICategory[]|void> {
        try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (error) {
      console.error(error);
      throw error;
    }
    }
}