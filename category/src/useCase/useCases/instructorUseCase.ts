
import { ICategory } from "../../entities/category";

import { IInstructorUserCase } from "../interfaces/useCasesInterfaces/IinstructorUseCase";
import { IInstructorRepository } from "../interfaces/repositoryInterfaces/IinstructorRepository";

export class InstructorUseCase implements IInstructorUserCase {
  constructor(private instructorRepository: IInstructorRepository) {}

  async getAllCategories(): Promise<ICategory[] | void> {
    try {
      const categories = await this.instructorRepository.find();
     if(categories){
      return categories;
     }
    } catch (error) {
      console.error(error);
    }
  }
}
