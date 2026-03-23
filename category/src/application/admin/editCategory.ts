import { BadRequestError, ErrorMessages, NotFoundError } from "@eduhublearning/common";
import { ICategory } from "../../domain/category";
import { IEditCategory } from "../../domain/insterfaces/admin/useCases/IEditCategory";
import { ICategoryRepository } from "../../domain/insterfaces/repositoryInterfaces/IcategoryRepository";

export class EditCategory
  implements IEditCategory{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  public async execute(input: {
    _id: string;
    title: string;
    description: string;
    topics: string[];
  }): Promise<ICategory | void> {
    try {
      const currentCategory = await this.categoryRepository.findById(input._id);

      if (!currentCategory) {
        throw new BadRequestError(ErrorMessages.CATEGORY_NOT_FOUND);
      }
      const checkCategory = await this.categoryRepository.findOne(input.title);

      if (
        checkCategory &&
        checkCategory._id?.toString() !== currentCategory._id?.toString()
      ) {
        throw new BadRequestError(ErrorMessages.CATEGORY_CONFLICT);
      }
      const updatedCategory = await this.categoryRepository.update(
        input._id,
        input.title,
        input.description,
        input.topics
      );
      return updatedCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
