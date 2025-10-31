import express from 'express';
import { isInstructor } from '../midllewares/auth';
const router = express.Router();
import upload from '../midllewares/multer';
import { addTestController, createCourseController, editCourseController, editTestController, instructorCourseDetailesController, instructorGetCoursesController, instructorGetStudentsController, listCourseController, testDetailesController, top5InstructorCoursesController, topRatingsController } from '../../insfrastructure/di/DiContainer';

router.post("/createCourse",isInstructor,upload,(req,res,next)=>createCourseController.handle(req,res,next))
router.get("/testDetailes/:testId",isInstructor,(req,res,next)=>testDetailesController.handle(req,res,next))
router.get("/getCourses",isInstructor,(req,res,next)=>instructorGetCoursesController.handle(req,res,next))
router.get("/courseDetailes/:courseId",isInstructor,(req,res,next)=>instructorCourseDetailesController.handle(req,res,next))
router.get("/students",isInstructor,(req,res,next)=>instructorGetStudentsController.handle(req,res,next))
router.patch("/listCourses/:courseId",isInstructor,(req,res,next)=>listCourseController.handle(req,res,next))
router.patch("/editCourse/:courseId",isInstructor,upload,(req,res,next)=>editCourseController.handle(req,res,next))
router.post("/tests/:courseId",isInstructor,(req,res,next)=>addTestController.handle(req,res,next))
router.patch("/tests/:testId",isInstructor,(req,res,next)=>editTestController.handle(req,res,next))
router.get("/course/:userId",isInstructor,(req,res,next)=>top5InstructorCoursesController.handle(req,res,next))
router.get("/topRated/:userId",isInstructor,(req,res,next)=>topRatingsController.handle(req,res,next))


export {router as instructorRoute}