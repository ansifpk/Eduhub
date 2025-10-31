import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { ICategory } from "../../domain/category";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";

export class TopCategories implements IUseCase<{next:NextFunction},ICategory[]|void> {
    constructor(private readonly instructorRepository:InstructorRepository) {
        
    }
    public async execute(input: { next: NextFunction; }): Promise<void | ICategory[]> {
        try {
      
      const categories = await this.instructorRepository.findTop5();
     if(categories){
       categories;
     }
    } catch (error) {
      console.error(error);
      input.next(error)
    }
    }
}