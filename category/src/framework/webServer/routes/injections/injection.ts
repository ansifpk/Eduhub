import { CategoryController } from "../../../../controller/categoryController";
import { InstructorController } from "../../../../controller/instructorCategory";
import { CategoryUseCase } from "../../../../useCase/useCases/categoryUseCases";
import { InstructorUseCase } from "../../../../useCase/useCases/instructorUseCase";
import { categoryModel } from "../../../db/mongoDB/models/categoryModel";
import { CategoryRepository } from "../../../db/mongoDB/repository/categoryRepository";
import { InstructorRepository } from "../../../db/mongoDB/repository/instructorRepository";



//instructor

const instructorRepository = new InstructorRepository(categoryModel); 
const instructorUseCase = new InstructorUseCase(instructorRepository)
const instructorController = new InstructorController(instructorUseCase);
//admin
const categoryRepository = new CategoryRepository(categoryModel); 
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);

export {categoryController,categoryRepository,categoryUseCase,instructorController,instructorRepository,instructorUseCase} 