import { NextFunction } from "express";
import { ICategory } from "../../domain/category";
import { CategoryRepository } from "../../infrastructure/db/repository/categoryRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";

export class AddCategory
  implements IUseCase<{ data: ICategory; next: NextFunction }, ICategory|void>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  public async execute(input: {
    data: ICategory;
    next: NextFunction;
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
      input.next(error);
    }
  }
}
