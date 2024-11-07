import { NextFunction, Request, Response } from "express";
import { ICategoryUserCase } from "../useCase/interfaces/useCasesInterfaces/IcategoryUseCases";


export class CategoryController{
    private categoryUseCase:ICategoryUserCase;
    constructor(categoryUseCase:ICategoryUserCase){
        this.categoryUseCase = categoryUseCase
    }

    async fechAllCategory(req:Request,res:Response,next:NextFunction){
        const categories = await this.categoryUseCase.getAllCategories();
        if(categories){
            return res.send(categories);
        }
    }
    async addCategory(req:Request,res:Response,next:NextFunction){
        const categories = await this.categoryUseCase.createCategory(req.body,next);
        if(categories){
            return res.status(201).send({success:true,data:categories});
        }
    }
    async editCategory(req:Request,res:Response,next:NextFunction){
   
        
        const categories = await this.categoryUseCase.editCategory(req.body._id,req.body.title,req.body.description,req.body.topics,next);
        console.log(categories)
        if(categories){
            return res.send({success:true,data:categories});
        }
    }
    async listCategory(req:Request,res:Response,next:NextFunction){
        const {categoryId} = req.params;
        // console.log("categoryid",categoryId)
        const categories = await this.categoryUseCase.listCategory(categoryId,next);
        if(categories){
            return res.status(201).send({success:true,data:categories});
        }
    }

}