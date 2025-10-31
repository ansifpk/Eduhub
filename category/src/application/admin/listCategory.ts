import { NextFunction } from "express";
import { ICategory } from "../../domain/category";
import { CategoryRepository } from "../../infrastructure/db/repository/categoryRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";

export class ListCategory
  implements IUseCase<{ _id: string; next: NextFunction }, ICategory | void>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  public async execute(input: {
    _id: string;
    next: NextFunction;
  }): Promise<ICategory | void> {
    try {
      const check = await this.categoryRepository.findById(input._id);

      if (check) {
        const done = await this.categoryRepository.list(check);
        if (done) {
          return check;
        } else {
          throw new BadRequestError("Category Not Fount");
        }
      } else {
        throw new BadRequestError("Category Not Fount");
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
