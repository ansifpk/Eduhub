import { Router } from "express";
import { categoryController } from "./injections/injection";


export function CategoryRoute(router:Router){
    router.get('/category',async(req,res,next)=>{
        categoryController.fechAllCategory(req,res,next)
    })
    router.post('/addCategory',async(req,res,next)=>{
        categoryController.addCategory(req,res,next)
    })
    router.patch('/editCategory',async(req,res,next)=>{
        // console.log(req.body);
        
        categoryController.editCategory(req,res,next)
    })
    router.patch('/listCategory/:categoryId',async(req,res,next)=>{
        categoryController.listCategory(req,res,next)
    })
}