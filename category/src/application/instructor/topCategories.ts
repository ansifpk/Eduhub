import { ICategory } from "../../domain/category";
import { ITopCategories } from "../../domain/insterfaces/instructor/useCases/ITopCatgories";
import { IInstructorRepository } from "../../domain/insterfaces/repositoryInterfaces/IinstructorRepository";

export class TopCategories implements ITopCategories {
    constructor(private readonly instructorRepository:IInstructorRepository) {
        
    }
    public async execute(): Promise<void | ICategory[]> {
        try {
      
      const categories = await this.instructorRepository.findTop5();
     if(categories){
       categories;
     }
    } catch (error) {
      console.error(error);
      throw error;
    }
    }
}