import { NextFunction } from "express";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { IUseCase } from "../../shared/IUseCase";
import { ICategory } from "../../domain/category";

export class GetCategoryUser
  implements IUseCase<{ next: NextFunction }, ICategory[] | void>
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    next: NextFunction;
  }): Promise<ICategory[] | void> {
    try {
      const categories = await this.instructorRepository.find();
      if (categories) {
        return categories;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
