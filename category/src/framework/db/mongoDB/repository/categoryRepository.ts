import { ICategory } from "../../../../entities/category";
import { ICategoryRepository } from "../../../../useCase/interfaces/repositoryInterfaces/IcategoryRepository";
import { categoryModel } from "../models/categoryModel";

export class CategoryRepository implements ICategoryRepository{
    constructor(
        private categoryModels:typeof categoryModel
    ){}
    async update(categoryId: string, title: string, description: string, topics: string[]): Promise<ICategory | void> {
        const category = await this.categoryModels.findByIdAndUpdate({_id:categoryId},{$set:{title:title,description:description,topics:topics}},{new:true})
        if(category){
            return category;
        }
    }
    async list(category: ICategory): Promise<any> {
        const catego = await this.categoryModels.updateOne({_id:category._id},{$set:{isListed:!category.isListed}},{ new: true })
        if(catego.acknowledged){
          return catego.acknowledged
        } 
    }
    async find(): Promise< ICategory[] | void> {
        const categories = await this.categoryModels.find();
        return categories
    }
    async findById(id: string): Promise<ICategory | void> {
        const category = await this.categoryModels.findById(id)
        if(category){
           return category;
        }
    }
    async findOne(name: string): Promise<ICategory | void> {
        const check = await this.categoryModels.findOne({ title: { $regex: `${name}`, $options: "i" } });
        if(check){
            return check
        }
    }
    async create(data: ICategory): Promise<ICategory | void> {
        const category = await this.categoryModels.create(data)
        return category
    }

}