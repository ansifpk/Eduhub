import mongoose from "mongoose";
import { instructotSubscribeModel } from "../models/instructorSubscribe";
import { OrderModel } from "../models/orderModel";
import { subscriptionModel } from "../models/subscriptionModel";
import { UserModel } from "../models/userMode";
import { userSubscriptionModel } from "../models/userSuscriptionModel";
import { IInstructorRepository } from "../../../domain/interfaces/repository/IInstructorRepository";
import { IUserSubcription } from "../../../domain/entities/userSubscription";
import { IInstructorSubscribe } from "../../../domain/entities/instructorSubscribe";
import { Iuser } from "../../../domain/entities/user";
import { ISubcription } from "../../../domain/entities/subscription";
import { IOrder } from "../../../domain/entities/order";

export class InstructorRepository implements IInstructorRepository {
  constructor(
    private orderMedels: typeof OrderModel,
    private userSubscriptionModels: typeof userSubscriptionModel,
    private subscriptionModels: typeof subscriptionModel,
    private userModels: typeof UserModel,
    private subscribeModel: typeof instructotSubscribeModel
  ) {}
  async setPriceId(
    subscriptionId: string,
    priceId: string
  ): Promise<IUserSubcription | void> {
    try {
      const subscriptions = await this.userSubscriptionModels.findByIdAndUpdate(
        { _id: subscriptionId },
        {
          $set: {
            priceId,
          },
        },
        { new: true }
      );
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async userSubscriptionFindByAndUpdate(
    subscriptionId: string,
    price: number
  ): Promise<IUserSubcription | void> {
    try {
      const subscriptions = await this.userSubscriptionModels.findByIdAndUpdate(
        { _id: subscriptionId },
        {
          $set: {
            price,
          },
        },
        { new: true }
      );
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async userSubscriptionFindById(
    subscriptionId: string
  ): Promise<IUserSubcription | void> {
    try {
      const subscriptions = await this.userSubscriptionModels.findById({
        _id: subscriptionId,
      });
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async checkSubscription(
    plan: string,
    instructorId: string
  ): Promise<IUserSubcription | void> {
    try {
      console.log(instructorId, "weuihwuie");
      const subscriptions = await this.userSubscriptionModels.findOne({
        plan,
        instructorId,
      });

      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async subscriptionCreate(
    userId: string,
    price: number,
    plan: string,
    description: string[],
    productId: string,
    priceId: string
  ): Promise<IUserSubcription | void> {
    try {
      const subscriptions = await this.userSubscriptionModels.create({
        instructorId: userId,
        price,
        plan,
        description,
        priceId,
        productId,
      });
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async userSubscriptionFindByPlan(
    plan: string
  ): Promise<IUserSubcription | void> {
    try {
      const subscriptions = await this.userSubscriptionModels.findOne({
        plan: plan,
      });
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findInstructorSubscriptions(
    userId: string
  ): Promise<IUserSubcription[] | void> {
    try {
      const subscriptions = await this.userSubscriptionModels.find({
        instructorId: userId,
      });
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error;
    }
  }
  async renewSubscribe(
    customerId: string
  ): Promise<IInstructorSubscribe | void> {
    try {
      const subscribe = await this.subscribeModel.findOneAndUpdate(
        { customerId: customerId },
        { $unset: { cancel_At: "" } },
        { new: true }
      );
      if (subscribe) {
        return subscribe;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async cancelSubscribe(
    date: number,
    customerId: string
  ): Promise<IInstructorSubscribe | void> {
    try {
      const subscribe = await this.subscribeModel.findOneAndUpdate(
        { customerId: customerId },
        { $set: { cancel_At: new Date(date * 1000) } },
        { new: true }
      );
      if (subscribe) {
        return subscribe;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async checkSubscribe(
    customerId: string
  ): Promise<IInstructorSubscribe | void> {
    try {
      const subscribe = await this.subscribeModel.findOne({
        customerId: customerId,
      });
      if (subscribe) {
        return subscribe;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createSubscribe(
    userId: string,
    subscriptionId: string,
    customerId: string,
    subscription: string
  ): Promise<IInstructorSubscribe | void> {
    try {
      const subscribe = await this.subscribeModel.create({
        subscriptionId: JSON.parse(subscriptionId),
        customerId,
        userId,
        subscription,
      });
      if (subscribe) {
        return subscribe;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findPlans(userId: string): Promise<IInstructorSubscribe[] | void> {
    try {
      const subscribes = await this.subscribeModel
        .find({ userId: userId })
        .populate("subscriptionId");
      if (subscribes) {
        return subscribes;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findPlan(userId: string): Promise<IInstructorSubscribe | void> {
    try {
      const subscribe = await this.subscribeModel
        .findOne({ userId: userId })
        .populate("subscriptionId");
      if (subscribe) {
        return subscribe;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async userFindById(userId: string): Promise<Iuser | void> {
    try {
      const user = await this.userModels.findById({ _id: new mongoose.Types.ObjectId(userId) });

      if (user) {
        return user;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async subscriptionFindByPlan(method: string): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.findOne({
        plan: method,
      });
      if (subscription) return subscription;
    } catch (error) {
      console.error(error);
    }
  }

  async subscribeInstructor(method: string): Promise<ISubcription | void> {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async findSubscriptions(): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.subscriptionModels.find();
      if (subscriptions) return subscriptions;
    } catch (error) {
      console.error(error);
    }
  }

  async orders(
    instructorId: string,
    start: string,
    end: string
  ): Promise<IOrder[] | void> {
    try {
      let query;
   
    
      if (start && end) {
        query = {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
          createdAt: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        };
      } else {
        query = {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
        };
      }

      const course = await this.orderMedels
        .find(query)
        .sort({ createdAt: 1 })
        .populate("user");

      return course;
    } catch (error) {
      console.error(error);
    }
  }
  async instrutcorOrders(
    instructorId: string,
    start: Date,
    end: Date
  ): Promise<IOrder[] | void> {
    try {
      const orders = await OrderModel.aggregate([
        {
          $match: {
            "course.instructorId": new mongoose.Types.ObjectId(instructorId),
            createdAt: {
              $gte: start,
              $lte: end,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateTrunc: { date: "$createdAt", unit: "day" },
            },
            delivered: { $sum: 1 },
          },
        },
      ]);
console.log(orders)
      if (orders) {
        return orders;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async subscriptionSetUser(
    subscriptionId: string,
    userId: string,
    customerId: string
  ): Promise<ISubcription | void> {
    try {
      subscriptionId = JSON.parse(subscriptionId);
      const subscription = await this.subscriptionModels.findByIdAndUpdate(
        { _id: subscriptionId },
        {
          $addToSet: {
            users: {
              _id: customerId,
              userId: userId,
            },
          },
        },
        { new: true }
      );

      if (subscription) {
        return subscription;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
