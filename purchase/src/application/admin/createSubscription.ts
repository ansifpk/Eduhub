import { BadRequestError, ErrorMessages, IController, IUseCase } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { ISubcription } from "../../domain/entities/subscription";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class AdminCreateSubscription
  implements
    IUseCase<
      {
        price: number;
        plan: string;
        description: string[];
        next: NextFunction;
      },
      ISubcription | void
    >
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    price: number;
    plan: string;
    description: string[];
    next: NextFunction;
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
      input.next(error);
    }
  }
}
