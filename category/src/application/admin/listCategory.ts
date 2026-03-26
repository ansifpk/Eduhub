import { ICategory } from "../../domain/category";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IListCatgory } from "../../domain/insterfaces/admin/useCases/IListCatgory";
import { ICategoryRepository } from "../../domain/insterfaces/repositoryInterfaces/IcategoryRepository";

export class ListCategory
  implements IListCatgory{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  public async execute(input: {
    _id: string;
  }): Promise<ICategory | void> {
    try {
      const check = await this.categoryRepository.findById(input._id);

      if (check) {
        const done = await this.categoryRepository.list(check);
        if (done) {
          return check;
        } else {
          throw new BadRequestError(ErrorMessages.CATEGORY_NOT_FOUND);
        }
      } else {
        throw new BadRequestError(ErrorMessages.CATEGORY_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
