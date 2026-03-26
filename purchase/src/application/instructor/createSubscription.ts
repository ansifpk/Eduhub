import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IUserSubcription } from "../../domain/entities/userSubscription";
import Stripe from "stripe";
import { IInstructorCreateSubscription } from "../../domain/interfaces/useCases/instructor/IInstructorCreateSubscription";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class InstructorCreateSubscription
  implements IInstructorCreateSubscription{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    userId: string;
    plan: string;
    price: number;
    description: string[];
  }): Promise<IUserSubcription | void> {
    try {
      const { userId, plan, price, description } = input;
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const checkSubscription =
        await this.instructorRepository.checkSubscription(plan, user.id);

      if (checkSubscription) {
        throw new BadRequestError(ErrorMessages.PLAN_CONFLICT);
      }
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

      const subscription = await this.instructorRepository.subscriptionCreate(
        userId,
        price,
        plan,
        description,
        product.id,
        stripePrice.id
      );
      if (subscription) {
        return subscription;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
