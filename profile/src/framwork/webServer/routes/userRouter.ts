import { Router } from "express";
import { userController } from "./injections/injections";
import { isAuth } from "../middlewares/authCheck";
import upload from '../middlewares/multer'
export function UserRouter(router: Router) {
  router.get("/profile/:userId", isAuth, async (req, res, next) => {
    try {
      console.log("hi guys");
      res.send("hello words")
      // userController.userProfile(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.patch("/profile/:userId", isAuth, async (req, res, next) => {
    try {
      userController.editProfile(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/Cart", isAuth, async (req, res, next) => {
    try {
     
      await userController.addToCart(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.get("/Cart/:userId", async (req, res, next) => {
    try {
      userController.Cart(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.delete("/Cart/:courseId/:userId", isAuth, async (req, res, next) => {
    try {
    
      
      userController.removeFromCart(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/rating", isAuth, async (req, res, next) => {
    try {
      userController.createRating(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.patch("/rating", isAuth, async (req, res, next) => {
    try {
      userController.editRating(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.delete("/rating/:ratingId", isAuth, async (req, res, next) => {
    try {
      userController.deleteRating(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.get("/rating/:instructorId", isAuth, async (req, res, next) => {
    try {
      userController.ratings(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
  router.patch("/profileImage/:userId",upload,isAuth, async (req, res, next) => {
    try {
      userController.profileImage(req, res, next);
    } catch (error) {
      console.error(error);
    }
  });
 
}
