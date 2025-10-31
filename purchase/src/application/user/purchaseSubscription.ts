import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { NextFunction } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class PurchaseSubscription
  implements
    IUseCase<
      { userId: string; subscriptionId: string; next: NextFunction },
      string | void
    >
{
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(input: {
    userId: string;
    subscriptionId: string;
    next: NextFunction;
  }): Promise<string | void> {
    try {
      const { userId, subscriptionId } = input;
      const user = await this.userRepository.findUser(userId);
      if (!user) {
        throw new BadRequestError("user not fount");
      }
      const subscription = await this.userRepository.subscriptionFindById(
        subscriptionId
      );
      if (!subscription) {
        throw new BadRequestError("Subscription not fount");
      }
      let customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        address: {
          line1: "123 Street Name",
          city: "City Name",
          country: "AE",
          postal_code: "12345",
        },
        metadata: {
          userType: "user",
        },
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: customer.id,
        mode: "subscription",
        line_items: [
          {
            price: subscription.priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
          buyer: "user",
          customerId: customer.id,
          subscriptionId: JSON.stringify(subscription._id),
          edited: "",
        },
        success_url: process.env.subscription_success_user_url,
        cancel_url: process.env.subscription_failed_user_url,
      });
      if (session) {
        return session.id;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
