import { NextFunction, Request, Response, Router } from "express";
import express from 'express';
import { userController } from "./injectes/injectes";


export function webHookRouter(router: Router) {
  router.post(
    "/webhook",
    express.raw({ type: 'application/json' }),
    async (req: Request, res: Response, next: NextFunction) => {
        // console.log("hi");
        
       userController.webhook(req, res, next);
    }
  );
}
