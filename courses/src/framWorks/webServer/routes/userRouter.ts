import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./injectionss/injections";
import bodyParser from "body-parser";
import express from "express";
import { isAuth } from "../midllewares/isAuth";

export function UserRouter(router: Router) {
  router.get(
    "/courses",
    async (req: Request, res: Response, next: NextFunction) => {
      userController.fetchCourses(req, res, next);
    }
  );
  router.get(
    "/getCourses/:instructorId",
    async (req: Request, res: Response, next: NextFunction) => {
      userController.getCourses(req, res, next);
    }
  );
  router.get(
    "/courseDetailes/:courseId",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.courseDetailes(req, res, next);
    }
  );
  router.get(
    "/puchasedCourses/:userId",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.purchasedCourses(req, res, next);
    }
  );
  router.post(
    "/create-checkout-session",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.placeOrder(req, res, next);
    }
  );

  router.get(
    "/rating/:courseId",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.getRatings(req, res, next);
    }
  );
  router.post(
    "/rating",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.rating(req, res, next);
    }
  );
  router.patch(
    "/rating",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.updateRating(req, res, next);
    }
  );
  router.delete(
    "/rating/:ratingId",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      userController.deleteRating(req, res, next);
    }
  );
}
