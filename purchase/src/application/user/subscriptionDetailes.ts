import Stripe from "stripe";
import { ISubscriptionDetailes } from "../../domain/interfaces/useCases/user/ISubscriptionDetailes";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});
export class SubscriptionDetailes
  implements ISubscriptionDetailes{
  
  public async execute(input: {
    customerId: string;
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
      throw error;
    }
  }
}
