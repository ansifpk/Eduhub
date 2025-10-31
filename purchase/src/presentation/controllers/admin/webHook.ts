import { BadRequestError, IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { WebHook } from "../../../application/admin/webHook";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class WebhookController implements IController {
  constructor(private readonly _useCase: WebHook) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sig = req.headers["stripe-signature"] as string;
      const enpointSeceret = process.env.STRIPE_WEBHOOK_SECRET!;

      if (!sig) {
        throw new BadRequestError("missing stripe signature");
      }

      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        enpointSeceret
      );
      if (event) {
        await this._useCase.execute({ event, next });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
