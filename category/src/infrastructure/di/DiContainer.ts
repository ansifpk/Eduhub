import { AddCategory } from "../../application/admin/addCategory"
import { EditCategory } from "../../application/admin/editCategory"
import { GetCategories } from "../../application/admin/GetCategories"
import { ListCategory } from "../../application/admin/listCategory"
import { GetCategoryUser } from "../../application/instructor/getCategory"
import { TopCategories } from "../../application/instructor/topCategories"
import { AddCategoryController } from "../../presentation/controllers/admin/addCategory"
import { EditCategoryController } from "../../presentation/controllers/admin/editCategory"
import { GetCategoryController } from "../../presentation/controllers/admin/getCategory"
import { ListCategoryController } from "../../presentation/controllers/admin/listCategoryConstroller"
import { GetCategoryUserController } from "../../presentation/controllers/users/getCategoryController"
import { TopCategoriesController } from "../../presentation/controllers/users/topCategories"
import { categoryModel } from "../db/models/categoryModel"
import { CategoryRepository } from "../db/repository/categoryRepository"
import { InstructorRepository } from "../db/repository/instructorRepository"

const categoryRepository  = new CategoryRepository(categoryModel)
const instructorRepository  = new InstructorRepository(categoryModel)

//* for admin
const getCategories = new GetCategories(categoryRepository)
const addCategories = new AddCategory(categoryRepository)
const editCategories = new EditCategory(categoryRepository)
const listCategories = new ListCategory(categoryRepository)

const getCategoryController = new GetCategoryController(getCategories)
const addCategoryController = new AddCategoryController(addCategories)
const editCategoryController = new EditCategoryController(editCategories)
const listCategoryController = new ListCategoryController(listCategories)

//* fro user
const getCategoryUseCase = new GetCategoryUser(instructorRepository)
const topCategoryUseCase = new TopCategories(instructorRepository)

const addCategoryUserController = new GetCategoryUserController(getCategoryUseCase)
const topCategoryUserController = new TopCategoriesController(topCategoryUseCase)

export {
    getCategoryController,
    addCategoryController,
    editCategoryController,
    listCategoryController,
    addCategoryUserController,
    topCategoryUserController
}