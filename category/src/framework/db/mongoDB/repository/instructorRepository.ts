import { ICategory } from "../../../../entities/category";
import { IInstructorRepository } from "../../../../useCase/interfaces/repositoryInterfaces/IinstructorRepository";
import { categoryModel } from "../models/categoryModel";

export class InstructorRepository implements IInstructorRepository{
    constructor(
        private categoryModels:typeof categoryModel
    ){}
   
    async find(): Promise< ICategory[] | void> {
        try {
            const categories = await this.categoryModels.find({isListed:true}).sort({title:-1});
            if(categories){
                return categories
            }
        } catch (error) {
            console.error(error)
        }
    }
   
}
