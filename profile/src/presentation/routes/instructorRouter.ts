import express from 'express';
import upload from '../middlewares/multer';
import { ratingsController, registerController } from '../../infrastructure/di/diContainer';
import { isInstructor } from '../middlewares/auth';
const router = express.Router();

router.patch("/register",upload,(req,res,next)=>registerController.handle(req,res,next))
router.get("/ratings/:userId",isInstructor,(req,res,next)=>ratingsController.handle(req,res,next))

export {router as instructorRouter}