import { isAuth } from "../middlewares/auth";
import { userController } from "./injections/injection";
import { Router } from "express";
export function UserRoute(router: Router) {
  router.post("/register", async (req, res, next) => {
    
    userController.signUp(req, res, next);
  });
  router.post("/createUser", async (req, res, next) => {
  
    userController.createUser(req, res, next);
  });
  router.post("/login",async (req, res, next) => {
    
    userController.userLogin(req, res, next);
  });
  router.post("/googleLogin", async (req, res, next) => {
    userController.googleLogin(req, res, next);
  });
  router.patch("/editUser",isAuth, async (req, res, next) => {    
    userController.editUser(req, res, next);
  });
  router.post("/resentOtp", async (req, res, next) => {
   
    userController.resentOtp(req, res, next);
  });
  router.post("/forgetPassword", async (req, res, next) => {

    userController.forgetPassword(req, res, next);
  });
  router.patch("/resetPassword/:userId", async (req, res, next) => {
    
    
    userController.resetPassword(req, res, next);
  });
  router.post("/verifyOtp", async (req, res, next) => {
    
    userController.verifyOtp(req, res, next);
  });
  router.post("/newPassword", async (req, res, next) => {
    userController.changePassword(req, res, next);
  });


  router.post("/logout", async (req, res, next) => {

    userController.logout(req, res, next);
  });
  router.post("/verifyEmail/:userId", async (req, res, next) => {
    userController.verifyEmail(req, res, next);
  });
  router.patch("/changeEmail/:userId", async (req, res, next) => {
    console.log("router",req.params,req.body);
    userController.changeEmail(req, res, next);
  });
}
