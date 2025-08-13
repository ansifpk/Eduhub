
import { ICategory } from "../../entities/category";
import { IInstructorUserCase } from "../interfaces/useCasesInterfaces/IinstructorUseCase";
import { IInstructorRepository } from "../interfaces/repositoryInterfaces/IinstructorRepository";

export class InstructorUseCase implements IInstructorUserCase {
  constructor(private instructorRepository: IInstructorRepository) {}
  async topCategories(): Promise<ICategory[] | void> {
   try {
       console.log("use case");
      
      const categories = await this.instructorRepository.findTop5();
     if(categories){
      return categories;
     }
    } catch (error) {
      console.error(error);
    }
  }

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
