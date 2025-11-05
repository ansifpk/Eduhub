import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { NextFunction } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});
export class SubscriptionDetailes
  implements
    IUseCase<{ customerId: string; next: NextFunction }, string | void>
{
  
  public async execute(input: {
    customerId: string;
    next: NextFunction;
  }): Promise<string | void> {
    try {
      const { customerId } = input;
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.CLIENT_URL}/user/profile/plan`,
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
