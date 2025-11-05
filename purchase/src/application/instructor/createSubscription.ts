import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { IUserSubcription } from "../../domain/entities/userSubscription";
import { NextFunction } from "express";
import Stripe from "stripe";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class InstructorCreateSubscription
  implements
    IUseCase<
      {
        userId: string;
        plan: string;
        price: number;
        description: string[];
        next: NextFunction;
      },
      IUserSubcription | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    userId: string;
    plan: string;
    price: number;
    description: string[];
    next: NextFunction;
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
      input.next(error);
    }
  }
}
