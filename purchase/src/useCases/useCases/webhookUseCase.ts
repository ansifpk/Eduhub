import { NextFunction } from "express";
import Stripe from "stripe";
import { IWebhookUseCase } from "../interfaces/useCases/IWebhookUseCase";
import { IWebhookRepository } from "../interfaces/repository/IwebhookRepository";
import { ICourse } from "../../entities/course";
import { OrderCreatedPublisher } from "../../framwork/webServer/config/kafka/producer/order-created-publisher";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../framwork/webServer/config/kafka/kafkaWrapper";
import { CouponUsedPublisher } from "../../framwork/webServer/config/kafka/producer/coupon-used-producer";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});

export class WebhookUseCase implements IWebhookUseCase {
  constructor(private webhokkRepository: IWebhookRepository) {}
  async webHook(event: Stripe.Event, next: NextFunction): Promise<void> {
    try {
  
      const session = event.data.object as Stripe.Checkout.Session;
      const previous = event.data.previous_attributes as any;
      
      switch (event.type) {
        case "checkout.session.completed":
          console.log("checkout.session.completed");

          if (session.metadata!.buyer == "instructor") {
    
             await this.webhokkRepository.createSubscribe(session.metadata!.userId,session.metadata!.subscriptionId,session.metadata!.customerId,session.subscription as string)
          } else if (session.metadata!.buyer == "user") {
             await this.webhokkRepository.createUserSubscribe(session.metadata!.userId,session.metadata!.subscriptionId,session.metadata!.customerId,session.subscription as string)
          } else {
            const courses: ICourse[] = [];
            session.metadata!.courseIds = JSON.parse(
              session.metadata!.courseIds as string
            );
        
            for (let i = 0; i < session.metadata!.courseIds.length; i++) {
              const course = await this.webhokkRepository.findById(
                session.metadata!.courseIds[i]
              );
              if (course) {
                courses.push(course);
              }
            }
            for (let value of courses) {
              value.price = Math.floor(
                value.price -
                  (value.price * parseInt(session.metadata!.couponOffer)) / 100
              );
              const order = await this.webhokkRepository.create(
                session.metadata!.userId,
                value
              );
              if (order) {
                await new OrderCreatedPublisher(
                  kafkaWrapper.producer as Producer
                ).produce({
                  _id: value._id!,
                  userId: session.metadata!.userId,
                });
              }
            }

            if (session.metadata!.couponId) {
              await new CouponUsedPublisher(
                kafkaWrapper.producer as Producer
              ).produce({
                couponId: session.metadata!.couponId,
                userId: session.metadata!.userId,
              });
            }
          }
         
          break;

        case "customer.subscription.deleted":
          console.log("instructor subscription deleted");
          // console.log(event.data);
          break;
        case "customer.subscription.paused":
          console.log("instructor subscription paused");
          // console.log(event.data);
          break;
        case "customer.subscription.updated":
          console.log("instructor stripe updated");

          if (event.data.previous_attributes?.cancel_at_period_end) {
            const customer = (await stripe.customers.retrieve(
              event.data.object.customer as string
            )) as Stripe.Customer;
            const { userType } = customer.metadata;
            if (userType == "instructor") {
              console.log("instructor rene");
               await this.webhokkRepository.renewSubscribe(event.data.object.customer as string)
              return;
            } else {
              console.log("user rene");
               await this.webhokkRepository.renewUserSubscribe(event.data.object.customer as string)
              return;
            }
          } else if (previous?.plan?.id && session.metadata!.edited) {
            console.log("instructor edited send notification");
            return;
          } else if (
            !event.data.previous_attributes?.status &&
            !event.data.previous_attributes?.cancel_at_period_end
          ) {
             const customer = await stripe.customers.retrieve(event.data.object.customer as string) as Stripe.Customer;
             const {userType} = customer.metadata
             if(userType   == "instructor"){
               await this.webhokkRepository.cancelSubscribe(event.data.object.cancel_at!,event.data.object.customer as string)
               return
             }else{
               // console.log("user cancell",userType)
               await this.webhokkRepository.cancelUserSubscribe(event.data.object.cancel_at!,event.data.object.customer as string)
               return
             }
          }
          //  else if(event.data.previous_attributes?.status){
          //    console.log("instructor sub created");
          //    return
          //  }else{

          //  }

          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
