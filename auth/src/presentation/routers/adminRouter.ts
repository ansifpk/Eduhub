import express from "express";
import { adminLoginController, adminLogoutController, blockUserController, tockenCheckController } from "../../infrastructure/di/DiContainer";
import { isAdmin } from "../middlewares/auth";
const router = express.Router();
router.post("/login",(req,res,next)=>adminLoginController.handle(req,res,next))
router.patch("/blockUser/:userId",isAdmin,(req,res,next)=>blockUserController.handle(req,res,next))
router.post("/refresh-token",(req,res,next)=>tockenCheckController.handle(req,res,next))
router.post("/logout",(req,res,next)=>adminLogoutController.handle(req,res,next))

export {router as adminRouter}