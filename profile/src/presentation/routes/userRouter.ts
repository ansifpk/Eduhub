import express from 'express';
import { isAuth } from '../middlewares/auth';
import { addToCartController, cartDetailesController, createRatingController, deleteRatingController, editRatingController, getInstructorRatingsontroller, getProfileController, profileImageController } from '../../infrastructure/di/diContainer';
import { editProfileController } from '../../infrastructure/di/diContainer';
import upload from '../middlewares/multer'
const router = express.Router();

router.get("/profile",isAuth,(req,res,next)=>getProfileController.handle(req,res,next));
router.patch("/profile/:userId",isAuth,(req,res,next)=>editProfileController.handle(req,res,next));
router.post("/Cart",(req,res,next)=>addToCartController.handle(req,res,next));
router.get("/Cart/:userId",(req,res,next)=>cartDetailesController.handle(req,res,next));
router.post("/rating", isAuth,(req,res,next)=>createRatingController.handle(req,res,next));
router.patch("/rating", isAuth,(req,res,next)=>editRatingController.handle(req,res,next));
router.delete("/rating/:ratingId", isAuth,(req,res,next)=>deleteRatingController.handle(req,res,next));
router.get("/rating/:instructorId", isAuth,(req,res,next)=>getInstructorRatingsontroller.handle(req,res,next));
router.patch("/profileImage/:userId",isAuth,upload, (req,res,next)=>profileImageController.handle(req,res,next));


export {router as userRouter}