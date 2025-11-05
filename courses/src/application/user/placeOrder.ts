import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { ICourse } from "../../domain/entities/course";
import { NextFunction } from "express";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { Stripe } from "../../insfrastructure/service/stripe";

export class PlaceOrder
  implements
    IUseCase<
      {
        course: ICourse[];
        userId: string;
        couponCode: string;
        next: NextFunction;
      },
      string | void
    >
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly stripe: Stripe
  ) {}
  public async execute(input: {
    course: ICourse[];
    userId: string;
    couponCode: string;
    next: NextFunction;
  }): Promise<string | void> {
    try {
      const { course, userId, couponCode } = input;
      const coupon = await this.userRepository.findByCouponCode(couponCode);
      if (couponCode && !coupon) {
        new BadRequestError(ErrorMessages.INVALID_COUPON_CODE);
      }

      let courseIds: string[] = [];
      let lineItems: any = [];
      course.map((value: ICourse) => {
        courseIds.push(value._id!);
        let discountPercentage = coupon ? coupon.offer : 0;
        let amount = value.price;
        if (discountPercentage) {
          amount = value.price - (value.price * discountPercentage) / 100;
        }

        lineItems.push({
          price_data: {
            currency: "INR",
            product_data: {
              name: value.title,
              images: [value.image.image_url],
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        });
      });

      const sessionId = await this.stripe.createStripe(lineItems, {
        userId: userId,
        courseIds: JSON.stringify(courseIds),
        couponOffer: coupon?.offer ? `${coupon?.offer}` : "0",
        couponId: JSON.stringify(coupon?._id),
      });
      if (sessionId) {
        return sessionId;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
