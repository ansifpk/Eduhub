
import express from "express";
import { isAuth } from "../middlewares/auth";
import { creatUserController, loginUserController, googleLoginController, resendOtpController, forgetPasswordController, resetPasswordController, verifyOtpController, changePasswordConstroller, verifyEmailConstroller, changeEmailConstroller, tockenCheckConstroller, logOutController } from "../../infrastructure/di/DiContainer";
const router = express.Router();

router.post("/register",(req,res,next)=>creatUserController.handle(req,res,next));
router.post("/login",(req,res,next)=>loginUserController.handle(req,res,next));
router.post("/googleLogin",(req,res,next)=>googleLoginController.handle(req,res,next));
router.post("/resentOtp",(req,res,next)=>resendOtpController.handle(req,res,next));
router.post("/forgetPassword",(req,res,next)=>forgetPasswordController.handle(req,res,next));
router.patch("/resetPassword/:userId",(req,res,next)=>resetPasswordController.handle(req,res,next));
router.post("/verifyOtp",(req,res,next)=>verifyOtpController.handle(req,res,next));
router.post("/newPassword",(req,res,next)=>changePasswordConstroller.handle(req,res,next));
router.post("/verifyEmail/:userId",(req,res,next)=>verifyEmailConstroller.handle(req,res,next));
router.patch("/changeEmail/:userId",(req,res,next)=>changeEmailConstroller.handle(req,res,next));
router.post("/refresh-token",(req,res,next)=>tockenCheckConstroller.handle(req,res,next));
router.post("/logout",isAuth,(req,res,next)=>logOutController.handle(req,res));


export {router as userRouter}