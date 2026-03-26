import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IUserSubcription } from "../../domain/entities/userSubscription";
import Stripe from "stripe";
import { IInstructorEditSubscription } from "../../domain/interfaces/useCases/instructor/IInstructorEditSubscription";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class InstructorEditSubscription
  implements IInstructorEditSubscription{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    subscriptionId: string;
    price: number;
    plan: string;
    instructorId: string;
  }): Promise<IUserSubcription | void> {
    try {
      const { subscriptionId, price, plan, instructorId } = input;
      const subscription =
        await this.instructorRepository.userSubscriptionFindById(
          subscriptionId
        );
      if (!subscription) {
        throw new BadRequestError(ErrorMessages.SUBSCRIPTION_NOT_FOUND);
      }
      const checkSubscription =
        await this.instructorRepository.checkSubscription(plan, instructorId);
      if (
        checkSubscription &&
        checkSubscription._id.toString() !== subscription._id.toString()
      ) {
        throw new BadRequestError(
          ErrorMessages.SUBSCRIPTION_CONFLICT
        );
      }

      const subscriptions =
        await this.instructorRepository.userSubscriptionFindByAndUpdate(
          subscriptionId,
          price
        );
      if (subscriptions) {
        const productPrices = await stripe.prices.list({
          product: subscription.productId,
        });
        if (productPrices) {
          for (let price of productPrices.data) {
            if (price.active) {
              await stripe.prices.update(price.id, { active: false });
            }
          }

          const stripePrice = await stripe.prices.create({
            unit_amount: price * 100,
            currency: "inr",
            recurring: { interval: "month" },
            product: subscription.productId,
          });
          await this.instructorRepository.setPriceId(
            subscriptionId,
            stripePrice.id
          );
          return subscriptions;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
