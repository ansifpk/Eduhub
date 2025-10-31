import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { NextFunction } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});
export class SubscriptionPurchase
  implements
    IUseCase<
      { userId: string; method: string; next: NextFunction },
      string | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    userId: string;
    method: string;
    next: NextFunction;
  }): Promise<string | void> {
    try {
      const { userId, method } = input;
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new BadRequestError("user Not found");
      }

      const subscription =
        await this.instructorRepository.subscriptionFindByPlan(method);
      if (!subscription) {
        throw new BadRequestError("Subscription Not found");
      }
      const checkSUbscribe = await this.instructorRepository.findPlan(userId);
      if (checkSUbscribe) {
        throw new BadRequestError("You Already have an active plan");
      }

      let customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });
      let customer = null;
      if (customers.data.length == 0) {
        customer = await stripe.customers.create({
          name: user.name,
          email: user.email,
          address: {
            line1: "123 Street Name",
            city: "City Name",
            country: "AE",
            postal_code: "12345",
          },
          metadata: {
            userType: "instructor",
          },
        });
      } else {
        customer = customers.data[0];
      }

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
          buyer: "instructor",
          customerId: customer.id,
          subscriptionId: JSON.stringify(subscription._id),
          price: subscription.priceId,
          edited: "",
        },
        success_url: process.env.success_url,
        cancel_url: process.env.failed_url,
      });

      return session.id;
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
