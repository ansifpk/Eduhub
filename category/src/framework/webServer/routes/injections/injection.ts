import { CategoryController } from "../../../../controller/categoryController";
import { CategoryUseCase } from "../../../../useCase/useCases/categoryUseCases";
import { categoryModel } from "../../../db/mongoDB/models/categoryModel";
import { CategoryRepository } from "../../../db/mongoDB/repository/categoryRepository";





const categoryRepository = new CategoryRepository(categoryModel); 
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);
export {categoryController,categoryRepository,categoryUseCase} 