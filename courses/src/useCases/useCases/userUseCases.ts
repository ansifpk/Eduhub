import { NextFunction } from "express";
import { ICourse } from "../../entities/course";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IS3bucket } from "../interfaces/service/Is3bucket";
import { IStripe } from "../interfaces/service/stripe";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IRating } from "../../entities/ratings";
import { ICoupon } from "../../entities/coupon";
import { ITest } from "../../entities/test";
import { IReport } from "../../entities/report";

import {
  BadRequestError,
  NotFoundError,
  StatusCodes,
} from "@eduhublearning/common";

export class UserUseCase implements IUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private s3bucketrepository: IS3bucket,
    private stripe: IStripe
  ) {}
  async placeOrder(
    course: ICourse[],
    userId: string,
    couponCode: string,
    next: NextFunction
  ): Promise<string|void> {
    try {
      const coupon = await this.userRepository.findByCouponCode(couponCode);
      if (couponCode && !coupon) {
        new BadRequestError("Invalid coupon code");
      }

      let courseIds: string[] = [];
      let lineItems: any = [];
      course.map((value: ICourse) => {
        
        courseIds.push(value._id!);
        let discountPercentage = coupon?coupon.offer:0
        let amount = value.price;
        if(discountPercentage){
          amount = value.price - (value.price*discountPercentage)/100
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

   
       
       const sessionId = await this.stripe.createStripe(lineItems,{
          userId: userId,
          courseIds: JSON.stringify(courseIds),
          couponOffer: coupon?.offer?coupon?.offer:0,
          couponId: JSON.stringify(coupon?._id),
        });
        if(sessionId){
          return sessionId;
        }

   
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getReports(
    userId: string,
    courseId: string,
    next: NextFunction
  ): Promise<IReport[] | void> {
    try {
      const reports = await this.userRepository.findReports(userId, courseId);
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async report(
    userId: string,
    report: string,
    content: string,
    courseId: string,
    next: NextFunction
  ): Promise<IReport | void> {
    try {
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new NotFoundError("Course not Found");
      }

      const checkReport = await this.userRepository.checkReport(
        userId,
        content,
        courseId
      );
      if (checkReport) {
        throw new BadRequestError("Already report this video");
      }
      const createReport = await this.userRepository.createReport(
        userId,
        report,
        content,
        courseId
      );
      if (createReport) {
        return createReport;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getTest(testId: string, next: NextFunction): Promise<ITest | void> {
    try {
      const test = await this.userRepository.findTest(testId);
      if (!test) throw new NotFoundError("Test not Found");

      if (test) {
        return test;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async submitTest(
    userId: string,
    testId: string,
    mark: number,
    next: NextFunction
  ): Promise<ITest | void> {
    try {
      const test = await this.userRepository.findTest(testId);
      if (!test) throw new NotFoundError("Test not Found");

      const updatedTest = await this.userRepository.submitTest(
        userId,
        testId,
        mark
      );
      if (updatedTest) {
        return updatedTest;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //TODO Coupon

  async addUserToCoupon(
    couponId: string,
    userId: string,
    next: NextFunction
  ): Promise<ICoupon | void> {
    try {
      const checkCoupon = await this.userRepository.findCoupon(couponId);
      if (!checkCoupon) throw new NotFoundError("Coupon not Found");
      const coupons = await this.userRepository.useCoupon(couponId, userId);
      if (coupons) {
        return coupons;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async findCouponByCode(
    couponCode: string,
    next: NextFunction
  ): Promise<ICoupon | void> {
    try {
      const coupons = await this.userRepository.findByCouponCode(couponCode);
      if (coupons) {
        return coupons;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCoupons(): Promise<ICoupon[] | void> {
    const coupons = await this.userRepository.Coupons();
    if (coupons) {
      return coupons;
    }
  }

  async couponDetailes(
    couponCode: string,
    userId: string,
    next: NextFunction
  ): Promise<ICoupon | void> {
    try {
      const today = new Date();
      const coupons = await this.userRepository.findByCouponCode(couponCode);

      if (!coupons) {
        //! coupon not fund error
        throw new BadRequestError("Invalid coupon code!.");
      }

      if (coupons.users.includes(userId)) {
        throw new BadRequestError("Already used this coupon code!.");
      }

      if (new Date(coupons.expiryDate) < today) {
        throw new BadRequestError("Coupon expired!.");
      }

      if (coupons) {
        //* return the coupon detailes
        return coupons;
      }
    } catch (error) {
      next(error);
    }
  }

  //TODO Ratings

  async deleteRating(
    ratingId: string,
    next: NextFunction
  ): Promise<IRating | void> {
    try {
      const checkRating = await this.userRepository.findRating(ratingId);
      if (!checkRating) {
        throw new NotFoundError("Rating not Found");
      }

      const rating = await this.userRepository.deleteRating(ratingId);
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async updateRating(
    ratingId: string,
    review: string,
    stars: number,
    next: NextFunction
  ): Promise<IRating | void> {
    try {
      const rating = await this.userRepository.findRating(ratingId);
      if (!rating) {
        throw new BadRequestError("Rating not Found");
      }
      const updatedRating = await this.userRepository.editRating(
        ratingId,
        review,
        stars
      );
      if (updatedRating) {
        return updatedRating;
      }
    } catch (error) {
      next(error);
      console.error(error);
    }
  }

  async getRatings(
    courseId: string,
    next: NextFunction
  ): Promise<IRating[] | void> {
    try {
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new BadRequestError("Course not Found");
      }
      const ratings = await this.userRepository.ratings(courseId);
      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async ratingCourse(
    courseId: string,
    userId: string,
    review: string,
    stars: number,
    next: NextFunction
  ): Promise<IRating | void> {
    try {
      const course = await this.userRepository.findById(courseId);
      if (!course) {
        throw new NotFoundError("Course not Found");
      }
      const checkRatings = await this.userRepository.checkRating(
        courseId,
        userId
      );
      if (checkRatings) {
        throw new BadRequestError("ALready Rated this course.");
      }
      const rating = await this.userRepository.createRating(
        courseId,
        userId,
        review,
        stars
      );
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //TODO Courses

  async getCourses(
    instructorId: string,
    next: NextFunction
  ): Promise<ICourse[] | void> {
    try {
      const courses = await this.userRepository.courses(instructorId);
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async purchasedCourses(
    userId: string,
    next: NextFunction
  ): Promise<ICourse[] | void> {
    try {
      const courses = await this.userRepository.findWithCondition(userId);
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCourses(
    category: string,
    topic: string,
    level: string,
    search: string,
    sort: string,
    page: number
  ): Promise<{ courses: ICourse[]; pages: number } | void> {
    try {
      const count = await this.userRepository.getPages(
        search,
        category,
        level,
        topic,
        sort
      );

      const pages = count as number;
      const courses = await this.userRepository.find({
        search,
        category,
        level,
        topic,
        sort,
        page,
      });
      if (courses && pages >= 0) {
        return { courses, pages };
      }
    } catch (error) {
      console.error(error);
    }
  }
  async courseDetailes(courseId: string): Promise<ICourse | void> {
    try {
      const course = await this.userRepository.findById(courseId);
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
