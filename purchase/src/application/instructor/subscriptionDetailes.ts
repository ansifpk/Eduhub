import Stripe from "stripe";
import { IInstructorSubscriptionDetailes } from "../../domain/interfaces/useCases/instructor/IInstructorSubscriptionDetailes";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class InstructorSubscriptionDetailes
  implements IInstructorSubscriptionDetailes{
  constructor() {}
  public async execute(input: {
    customerId: string;
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
      throw error;
    }
  }
}
