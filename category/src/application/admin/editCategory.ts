import { BadRequestError, ErrorMessages, NotFoundError } from "@eduhublearning/common";
import { CategoryRepository } from "../../infrastructure/db/repository/categoryRepository";
import { IUseCase } from "../../shared/IUseCase";
import { ICategory } from "../../domain/category";
import { NextFunction } from "express";

export class EditCategory
  implements
    IUseCase<
      {
        _id: string;
        title: string;
        description: string;
        topics: string[];
        next: NextFunction;
      },
      ICategory | void
    >
{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  public async execute(input: {
    _id: string;
    title: string;
    description: string;
    topics: string[];
    next: NextFunction;
  }): Promise<ICategory | void> {
    try {
      const currentCategory = await this.categoryRepository.findById(input._id);

      if (!currentCategory) {
        throw new NotFoundError(ErrorMessages.CATEGORY_NOT_FOUND);
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
      input.next(error);
    }
  }
}
