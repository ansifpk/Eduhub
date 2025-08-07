import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
import { IInstructorUseCase } from "../interfaces/useCases/IInstrctorUseCase";
import { IUserSubcription } from "../../entities/userSubscription";
import { IInstructorRepository } from "../interfaces/repository/IInstructorRepository";
import { ISubcription } from "../../entities/subscription";
import Stripe from "stripe";
import { IInstructorSubscribe } from "../../entities/instructorSubscribe";
import exceljs from "exceljs";
import { BadRequestError, NotFoundError } from "@eduhublearning/common";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class InstructorUseCase implements IInstructorUseCase {
  constructor(private instructorRepository: IInstructorRepository) {}
  async instructorOrders(
    instructorId: string,
    filter: string,
    next: NextFunction
  ): Promise<IOrder[] | void> {
    try {
      const user = await this.instructorRepository.userFindById(instructorId);
      if (!user) {
        throw new NotFoundError("user Not found");
      }
      const orders = await this.instructorRepository.instrutcorOrders(instructorId,filter);
      if (orders) {
        return orders;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async editSubscription(
    subscriptionId: string,
    price: number,
    next: NextFunction
  ): Promise<IUserSubcription | void> {
    try {
      const Subscription =
        await this.instructorRepository.userSubscriptionFindById(
          subscriptionId
        );
      if (!Subscription) {
        throw new NotFoundError("Subscription Not found");
      }
      const subscriptions = await stripe.subscriptions.list();

      // const subscriptions  = await this.instructorRepository.userSubscriptionFindByAndUpdate(subscriptionId,price)
      // if(subscriptions){
      const productPrices = await stripe.prices.list({
        product: Subscription.productId,
      });

      //   if(productPrices){

      // for (let price of productPrices.data) {
      //    if (price.active) {
      //      await stripe.prices.update(price.id, { active: false });
      //    }
      //  }
      //    const stripePrice = await stripe.prices.create({
      //      unit_amount: price * 100,
      //      currency: 'inr',
      //      recurring: { interval: 'month' },
      //      product: Subscription.productId,
      //  });
      //  await this.instructorRepository.setPriceId(subscriptionId,stripePrice.id);
      //  return subscriptions;
      //   }

      // }
    } catch (error) {
      console.error(error);
    }
  }

  async instructorSubscriptions(
    userId: string,
    next: NextFunction
  ): Promise<IUserSubcription[] | void> {
    try {
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new NotFoundError("user Not found");
      }
      const subscriptions =
        await this.instructorRepository.findInstructorSubscriptions(userId);
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getPlans(
    userId: string,
    next: NextFunction
  ): Promise<IInstructorSubscribe[] | void> {
    try {
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new NotFoundError("user Not found");
      }
      const plans = await this.instructorRepository.findPlans(userId);
      if (plans) {
        return plans;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async subscriptionDetailes(
    customerId: string,
    next: NextFunction
  ): Promise<string | void> {
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.success_url,
      });
  
      if (portalSession) {
        return portalSession.url;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async purchaseSubscription(
    userId: string,
    method: string,
    next: NextFunction
  ): Promise<string | void> {
    try {
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new BadRequestError("user Not found");
      }

      const subscription =
        await this.instructorRepository.subscriptionFindByPlan(method);
      if (!subscription) {
        throw new BadRequestError("Subscription Not found");
      }
      const checkSUbscribe = await this.instructorRepository.findPlan(userId);
      if (checkSUbscribe) {
        throw new BadRequestError("You Already have an active plan");
      }

      let customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });
      let customer = null;
      if (customers.data.length == 0) {
        customer = await stripe.customers.create({
          name: user.name,
          email: user.email,
          address: {
            line1: "123 Street Name",
            city: "City Name",
            country: "AE",
            postal_code: "12345",
          },
          metadata: {
            userType: "instructor",
          },
        });
      } else {
        customer = customers.data[0];
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: customer.id,
        mode: "subscription",
        line_items: [
          {
            price: subscription.priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
          buyer: "instructor",
          customerId: customer.id,
          subscriptionId: JSON.stringify(subscription._id),
          price: subscription.priceId,
          edited: "",
        },
        success_url: process.env.success_url,
        cancel_url: process.env.failed_url,
      });

      return session.id;
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getSubscriptions(next: NextFunction): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.instructorRepository.findSubscriptions();
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getInstructorsSubscriptions(
    next: NextFunction
  ): Promise<IUserSubcription[] | void> {
    try {
      // const subscription = await this.instructorRepository.
    } catch (error) {
      console.error(error);
    }
  }

  async createSubscription(
    userId: string,
    plan: string,
    price: number,
    description: string[],
    next: NextFunction
  ): Promise<IUserSubcription | void> {
    try {
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new NotFoundError("user Not found");
      }
      const checkSUbscription =
        await this.instructorRepository.userSubscriptionFindByPlan(plan);
      if (checkSUbscription) {
        throw new BadRequestError("This Plan Already Exists");
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
    }
  }

  async getOrders(
    instructorId: string,
    start: string,
    end: string,
    next: NextFunction
  ): Promise<IOrder[] | void> {
    try {
      
      const checkUser = await this.instructorRepository.userFindById(
        instructorId
      );
      if (!checkUser) {
        throw new BadRequestError("user Not found");
      }
      const orders = await this.instructorRepository.orders(
        instructorId,
        start,
        end
      );
    
      return orders;
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async createReport(
    userId: string,
    report: string,
    year: string,
    month: string,
    next: NextFunction
  ): Promise<exceljs.Workbook | void> {
    try {
      // const checkUser = await this.instructorRepository.userFindById(userId);
      // if (!checkUser) {
      //   throw new NotFoundError("user Not found");
      // }

      // const orders = await this.instructorRepository.instrutcorOrders(userId);

      // const workbook = new exceljs.Workbook();
      // const worksheet = workbook.addWorksheet("Orders");
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no", width: 20 },
      //   { header: "User Name", key: "userName", width: 20 },
      //   { header: "Course Name", key: "courseName", width: 20 },
      //   { header: "Course Price", key: "coursePrice", width: 20 },
      //   { header: "Order Date", key: "orderDate", width: 20 },
      //   { header: "Total", key: "total", width: 20 },
      // ];
      // const months = [
      //   "01",
      //   "02",
      //   "03",
      //   "04",
      //   "05",
      //   "06",
      //   "07",
      //   "08",
      //   "09",
      //   "10",
      //   "11",
      //   "12",
      // ];

      // let starting = "";
      // let ending = "";
      // if (report == "Monthly") {
      //   const index = months[parseInt(month)];
      //   starting = `${year}-${index}-01`;
      //   ending = `${year}-${index}-30`;
      // } else {
      //   starting = `${year}-01-01`;
      //   ending = `${year}-12-30`;
      // }

      // if (orders) {
      //   let datas = {
      //     s_no: 0,
      //     userName: "",
      //     courseName: "",
      //     coursePrice: 0,
      //     orderDate: new Date(),
      //     total: 0,
      //   };

      //   orders.map((order, index) => {
      //     if (
      //       order.createdAt >= new Date(starting) &&
      //       order.createdAt <= new Date(ending)
      //     ) {
      //       datas.s_no = index + 1;
      //       datas.userName = order.user.name;
      //       datas.courseName = order.course.title;
      //       datas.coursePrice = order.course.price;
      //       datas.orderDate = order.createdAt;
      //       datas.total = order.course.price;
      //       worksheet.addRow(datas);
      //     }
      //   });
      //   worksheet.getRow(1).eachCell((cell) => {
      //     cell.font = { bold: true };
      //   });
      //   return workbook;
      // }
    } catch (error) {
      console.error(error);
    }
  }
}
