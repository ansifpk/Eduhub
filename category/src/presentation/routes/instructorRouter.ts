import express from 'express';
import { addCategoryUserController, topCategoryUserController } from '../../infrastructure/di/DiContainer';
const router = express.Router()

router.get("/category",(req,res,next)=>addCategoryUserController.handle(req,res,next))
router.get("/topCategories",(req,res,next)=>topCategoryUserController.handle(req,res,next))

export {router as instructorRouter};