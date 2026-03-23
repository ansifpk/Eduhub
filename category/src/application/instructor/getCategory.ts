import { ICategory } from "../../domain/category";
import { IGetCategory } from "../../domain/insterfaces/instructor/useCases/IGetCategory";
import { IInstructorRepository } from "../../domain/insterfaces/repositoryInterfaces/IinstructorRepository";

export class GetCategoryUser implements IGetCategory{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(): Promise<ICategory[] | void> {
    try {
      const categories = await this.instructorRepository.find();
      if (categories) {
        return categories;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
