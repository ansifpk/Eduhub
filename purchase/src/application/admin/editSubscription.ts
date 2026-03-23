import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ISubcription } from "../../domain/entities/subscription";
import Stripe from "stripe";
import { IAdminEditSubscriptions } from "../../domain/interfaces/useCases/admin/IAdminEditSubscription";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminrepository";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class AdminEditSubscription
  implements IAdminEditSubscriptions{
  constructor(private readonly adminRepository: IAdminRepository) {}

  public async execute(input: {
    subscriptionId: string;
    price: number;
  }): Promise<void | ISubcription> {
    try {
      const { subscriptionId, price } = input;
      const check = await this.adminRepository.findSubscriptionById(
        subscriptionId
      );
      if (!check) {
        throw new BadRequestError(ErrorMessages.SUBSCRIPTION_NOT_FOUND);
      }
      const sub = await stripe.subscriptions.list({});

      let subscription = sub.data.filter((value) => {
        return value.items.data.find(
          (val) => val.price.product == check.productId
        );
      });

      const subItemId = await stripe.subscriptions.retrieve(subscription[0].id);

      const productPrices = await stripe.prices.list({
        product: check.productId,
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
          product: check.productId,
        });
        await stripe.subscriptions.update(subscription[0].id, {
          items: [
            {
              id: subItemId.items.data[0].id,
              price: stripePrice.id,
            },
          ],
          metadata: {
            edited: "admin",
          },
        });
        const edit = await this.adminRepository.subscriptionEditById(
          subscriptionId,
          price,
          stripePrice.id
        );
        if (edit) {
          return edit;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
