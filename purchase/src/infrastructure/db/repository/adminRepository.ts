
import { IOrder } from "../../../domain/entities/order";
import { ISubcription } from "../../../domain/entities/subscription";
import { IAdminRepository } from "../../../domain/interfaces/repository/IAdminrepository";
import { OrderModel } from "../models/orderModel";
import { subscriptionModel } from "../models/subscriptionModel";

export class AdminRepository implements IAdminRepository {
  constructor(
    private subscriptionModels: typeof subscriptionModel,
    private orderModels: typeof OrderModel
  ) {}

  async findOrders(start: string, end: string): Promise<IOrder[] | void> {
    try {
      let query;

      if (start && end) {
        query = {
          createdAt: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        };
      } else {
        query = {};
      }

      const orders = await this.orderModels
        .find(query)
        .sort({ createdAt: 1 })
        .populate("user");

      if (orders) {
        return orders;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async setProductId(
    subscriptionId: string,
    productId: string,
    priceId: string
  ): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.findByIdAndUpdate(
        { _id: subscriptionId },
        {
          $set: {
            productId,
            priceId,
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

  async subscriptionEditById(
    subscriptionId: string,
    price: number,
    priceId: string
  ): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.findByIdAndUpdate(
        { _id: subscriptionId },
        {
          $set: {
            price,
            priceId,
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

  async subscriptionDeleteById(
    subscriptionId: string
  ): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.findByIdAndDelete({
        _id: subscriptionId,
      });
      if (subscription) {
        return subscription;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findSubscriptionById(
    subscriptionId: string
  ): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.findById({
        _id: subscriptionId,
      });
      if (subscription) {
        return subscription;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findSubscriptions(): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.subscriptionModels.find();
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findSubscription(plan: string): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.findOne({
        plan: plan,
      });
      if (subscription) {
        return subscription;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async createSubscription(
    price: number,
    plan: string,
    description: string[]
  ): Promise<ISubcription | void> {
    try {
      const subscription = await this.subscriptionModels.create({
        price,
        description,
        plan,
      });

      if (subscription) {
        return subscription;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findChartOrders(start:string,end:string): Promise<IOrder[] | void> {
    try {

       
       const orders = await OrderModel.aggregate([
              {
                $match: {
                  createdAt: {
                    $gte: new Date(start),
                    $lte: new Date(end),
                  },
                },
              },
              {
                $group: {
                  _id: {
                    $dateToString: {format: "%Y-%m-%d", date: "$createdAt", },
                  },
                  delivered: { $sum: 1 },
                },
              },
              {
                $sort:{_id:1}
              }
            ]);

      if (orders) {
        return orders;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
