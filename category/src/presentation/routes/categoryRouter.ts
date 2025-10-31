
import express from 'express';
import { addCategoryController, editCategoryController, getCategoryController, listCategoryController } from '../../infrastructure/di/DiContainer';
const router = express.Router()

router.get('/category',(req,res,next)=>getCategoryController.handle(req,res,next))
router.post('/addCategory',(req,res,next)=>addCategoryController.handle(req,res,next))
router.patch('/editCategory',(req,res,next)=>editCategoryController.handle(req,res,next))
router.patch('/listCategory/:categoryId',(req,res,next)=>listCategoryController.handle(req,res,next))

export {router as categoryRouter}