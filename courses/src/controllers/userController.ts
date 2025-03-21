import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";
import Stripe from "stripe";
import dotenv from "dotenv";
import { ICourse } from "../entities/course";
import { ICoupon } from "../entities/coupon";
import { NotFoundError, StatusCodes } from "@eduhublearning/common";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2024-11-20.acacia",
});

export class UserController {
  constructor(private userUseCase: IUserUseCase) {}

  async fetchCourses(req: Request, res: Response, next: NextFunction) {
    const { category, level, topic, search,sort,page } = req.query;
  
    const courses = await this.userUseCase.fetchCourses(
      category as string,
      topic as string,
      level as string,
      search as string,
      sort as string,
      parseInt(page as string)
    );
    if (courses) {
      res.send({ success: true, courses: courses.courses , pages:courses.pages });
    }
  }
  async getCourses(req: Request, res: Response, next: NextFunction) {
    const { instructorId } = req.params;
    const courses = await this.userUseCase.getCourses(instructorId, next);
    if (courses) {
      res.send({ success: true, courses: courses });
    }
  }

  async courseDetailes(req: Request, res: Response, next: NextFunction) {
    const { courseId } = req.params;
    const course = await this.userUseCase.courseDetailes(courseId);
    if (course) {
      res.send({ success: true, course: course });
    }
  }

  async purchasedCourses(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    const course = await this.userUseCase.purchasedCourses(userId, next);
    if (course) {
      res.send({ success: true, course: course });
    }
  }

  async placeOrder(req: Request, res: Response, next: NextFunction) {
    const { course, userId, couponCode } = req.body;
    
    let coupon:ICoupon = {
      _id: "",
      title: "",
      couponCode: "",
      description: "",
      offer: 0,
      expiryDate: "",
      startingDate: "",
      users: [],
      createdAt: "",
      updatedAt: "",
      expiryTime: "",
      startingTime: ""
    }
    let offer = 0;
    if(couponCode){
       coupon = await this.userUseCase.findCouponByCode(couponCode, next) as ICoupon;
       if (!coupon) throw new NotFoundError("Invalid coupon code")
      
      offer = coupon.offer
      await this.userUseCase.addUserToCoupon(coupon._id,userId,next)
    }

    const customer = await stripe.customers.create({
      name: "ansif",
      address: {
        line1: "123 Street Name",
        city: "City Name",
        country: "AE",
        postal_code: "12345",
      },
    });
    let courseIds:string[] = []
   
    let lineItems:any = [];
      course.map((value: ICourse) => {
            let discountPercentage = coupon?coupon.offer:0
            courseIds.push(value._id!)
            let amount = value.price;
            if(discountPercentage){
              amount = value.price - (value.price*discountPercentage)/100
            }


         lineItems.push({price_data: {
        currency: "INR",
        product_data: {
          name: value.title,
          images: [value.image.image_url],
        },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,})
    });

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer: customer.id,
      metadata: {
        userId: userId,
        courseIds:JSON.stringify(courseIds),
        couponOffer:offer,
        couponId:JSON.stringify(coupon._id)
      },
      success_url: "https://www.eduhublearning.online/user/success",
      cancel_url: "https://www.eduhublearning.online/user/faile",
    });

    if (session) {
      res.json({ id: session.id });
    }
  }



  async rating(req: Request, res: Response, next: NextFunction) {
    const { review, stars, courseId, userId } = req.body;
    const rating = await this.userUseCase.ratingCourse(
      courseId,
      userId,
      review,
      stars,
      next
    );
    if (rating) {
      return res.send({ success: true, rating: rating });
    }
  }

  async getRatings(req: Request, res: Response, next: NextFunction) {
    const { courseId } = req.params;
    const ratings = await this.userUseCase.getRatings(courseId, next);
    if (ratings) {
      return res.send({ success: true, rating: ratings });
    }
  }

  async updateRating(req: Request, res: Response, next: NextFunction) {
    const { ratingId, review, stars } = req.body;
    const ratings = await this.userUseCase.updateRating(
      ratingId,
      review,
      stars,
      next
    );
    if (ratings) {
      return res.send({ success: true, rating: ratings });
    }
  }

  async deleteRating(req: Request, res: Response, next: NextFunction) {
    const { ratingId } = req.params;
   

    const ratings = await this.userUseCase.deleteRating(ratingId, next);
    if (ratings) {
      return res.send({ success: true, rating: ratings });
    }
  }

  //coupons
  async fetchCoupons(req: Request, res: Response, next: NextFunction) {
    const coupons = await this.userUseCase.fetchCoupons();
    if (coupons) {
      return res.send({ success: true, coupons: coupons });
    }
  }

  async couponDetailes(req: Request, res: Response, next: NextFunction) {
    const { couponCode } = req.params;
    const coupons = await this.userUseCase.couponDetailes(couponCode, next);
    if (coupons) {
      return res.send({ success: true, coupons: coupons });
    }
  }

  async getTest(req: Request, res: Response, next: NextFunction) {
    const { testId } = req.params;
    const test = await this.userUseCase.getTest(testId, next);
    if (test) {
      return res.send({ success: true, test: test });
    }
  }

  async submitTest(req: Request, res: Response, next: NextFunction) {
    const { testId } = req.params;
    const { userId,mark } = req.body;
    const test = await this.userUseCase.submitTest(userId,testId,mark, next);
    if (test) {
      return res.send({ success: true });
    }
  }
  async report(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { report,content,courseId } = req.body;
    const createReport = await this.userUseCase.report(userId,report,content,courseId,next);
    if (createReport) {
      return res.send({ success: true,report:createReport });
    }
  }
  async getReports(req: Request, res: Response, next: NextFunction) {
    const { userId,courseId } = req.params;
    const reports = await this.userUseCase.getReports(userId,courseId,next);
    if (reports) {
      return res.send({ success: true,reports:reports });
    }
  }
}
