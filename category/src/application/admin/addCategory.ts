import { ICategory } from "../../domain/category";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IAddCategory } from "../../domain/insterfaces/admin/useCases/IAddCategory";
import { ICategoryRepository } from "../../domain/insterfaces/repositoryInterfaces/IcategoryRepository";

export class AddCategory implements IAddCategory{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  public async execute(input: {
    data: ICategory;
  }): Promise<ICategory|void> {
    try {
      const check = await this.categoryRepository.findOne(input.data.title);
      if (check) {
        throw new BadRequestError(ErrorMessages.CATEGORY_CONFLICT);
      } 
        if(input.data.topics.length == 0) throw new BadRequestError("Atleast one topic is required");
        if(!input.data.description) throw new BadRequestError("Description is Required");

        const category = await this.categoryRepository.create(input.data);
        return category;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
