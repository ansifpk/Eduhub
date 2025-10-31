import express from 'express'
import { checkTockenController, getStudentsController, loginInstructorController, logOutInstrcutorController } from '../../infrastructure/di/DiContainer';
const router = express.Router();

router.post('/login',(req,res,next)=>loginInstructorController.handle(req,res,next))
router.get('/getStudents',(req,res,next)=>getStudentsController.handle(req,res,next))
router.post("/refresh-token",(req,res,next)=>checkTockenController.handle(req,res,next))
router.post("/logout",(req,res,next)=>logOutInstrcutorController.handle(req,res,next))

export {router as instructorRouter}