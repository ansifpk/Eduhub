import { NextFunction, Request, Response, Router } from "express";
import express from 'express';
import { webhookController } from "./injectes/injectes";


export function webHookRouter(router: Router) {

  router.post(
    "/subscription/webhook",
    express.raw({ type: 'application/json' }),
    async (req: Request, res: Response, next: NextFunction) => {
       webhookController.webhook(req, res, next);
    }
  );
}
