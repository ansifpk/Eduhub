import { NextFunction } from "express";
import { IUseCase } from "@eduhublearning/common";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class InstructorSubscriptionDetailes
  implements
    IUseCase<{ customerId: string; next: NextFunction }, string | void>
{
  constructor() {}
  public async execute(input: {
    customerId: string;
    next: NextFunction;
  }): Promise<string | void> {
    try {
      const { customerId } = input;
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.success_url,
      });

      if (portalSession) {
        return portalSession.url;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
