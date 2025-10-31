import express from 'express';
import { isAdmin } from '../middlewares/auth';
import { getInstructorsController, instructorAprovelController, instructorRequestController, topInstructorsController } from '../../infrastructure/di/diContainer';
const router  = express.Router();

router.get("/instructors",isAdmin,(req,res,next)=>getInstructorsController.handle(req,res,next));
router.get("/students",isAdmin,(req,res,next)=>getInstructorsController.handle(req,res,next));
router.get("/instructorRequest",isAdmin,(req,res,next)=>instructorRequestController.handle(req,res,next));
router.patch("/instructorAprovel",isAdmin,(req,res,next)=>instructorAprovelController.handle(req,res,next));
router.get("/top5Instructors",isAdmin,(req,res,next)=>topInstructorsController.handle(req,res,next));

export {router as adminRouter}