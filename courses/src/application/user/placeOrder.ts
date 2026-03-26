import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICourse } from "../../domain/entities/course";
import { IPlaceOrder } from "../../domain/interfaces/user/IPlaceOrder";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";
import { IStripe } from "../../domain/interfaces/service/stripe";

export class PlaceOrder
  implements IPlaceOrder{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly stripe: IStripe
  ) {}
  public async execute(input: {
    course: ICourse[];
    userId: string;
    couponCode: string;
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
      throw Error;
    }
  }
}
