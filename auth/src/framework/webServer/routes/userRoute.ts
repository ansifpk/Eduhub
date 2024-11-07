import { isAuth } from "../middlewares/auth";
import { userController } from "./injections/injection";
import {Router } from "express";
export function UserRoute(router:Router){
    router.post("/register",async(req,res,next)=>{
        // console.log("coming in register");
        userController.signUp(req,res,next);
    });
    router.post("/createUser",async(req,res,next)=>{
        // console.log("coming in createuser");
        userController.createUser(req,res,next);
    });
    router.post("/login",isAuth,async(req,res,next)=>{
        // console.log("coming in login",req.body);
        userController.userLogin(req,res,next);
    });
    router.post("/googleLogin",isAuth,async(req,res,next)=>{
        // console.log("coming in googleLogin",req.body);
        userController.googleLogin(req,res,next);
    });
    router.patch("/editUser",isAuth,async(req,res,next)=>{
        console.log("coming in editUser",req.body);
        userController.editUser(req,res,next);
    });
    router.post("/resentOtp",isAuth,async(req,res,next)=>{
        // console.log("coming in resentOtp",req.body);
        userController.resentOtp(req,res,next)
    });
    router.post("/forgetPassword",isAuth,async(req,res,next)=>{
            // console.log("coming in forgetPassword",req.body);
            userController.forgetPassword(req,res,next)
    });
    router.post("/verifyOtp",async(req,res,next)=>{
            userController.verifyOtp(req,res,next)
    });
    router.post("/newPassword",isAuth,async(req,res,next)=>{
            userController.changePassword(req,res,next)
    });

    router.post("/logout",isAuth,async(req,res,next)=>{
        // console.log("coming in logoutUser");
        userController.logout(req,res,next);
    });
}