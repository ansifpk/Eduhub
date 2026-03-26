import { BadRequestError, ErrorMessages} from "@eduhublearning/common";
import { ISubcription } from "../../domain/entities/subscription";
import Stripe from "stripe";
import { IAdminCreateSubscriptions } from "../../domain/interfaces/useCases/admin/IAdminCreateSubscription";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminrepository";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class AdminCreateSubscription
  implements IAdminCreateSubscriptions {
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    price: number;
    plan: string;
    description: string[];
  }): Promise<ISubcription | void> {
    try {
      const { price, plan, description } = input;
      const check = await this.adminRepository.findSubscription(plan);
      if (check) {
        throw new BadRequestError(ErrorMessages.PLAN_CONFLICT);
      }
      const subscription = await this.adminRepository.createSubscription(
        price,
        plan,
        description
      );
      if (subscription) {
        const product = await stripe.products.create({
          name: plan,
          description: description.join(","),
        });
        const stripePrice = await stripe.prices.create({
          unit_amount: price * 100,
          currency: "inr",
          recurring: { interval: "month" },
          product: product.id,
        });

        await this.adminRepository.setProductId(
          subscription._id,
          product.id,
          stripePrice.id
        );

        return subscription;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
