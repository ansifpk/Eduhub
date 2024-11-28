import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET!,{apiVersion:'2024-10-28.acacia'})

export class UserController{
   constructor(
    private userUseCase:IUserUseCase
   ){}

   async fetchCourses(req:Request,res:Response,next:NextFunction){
      const courses = await this.userUseCase.fetchCourses()
      if(courses){
        res.send({success:true,courses:courses})
      }
   }

   async courseDetailes(req:Request,res:Response,next:NextFunction){
      const  {courseId} = req.params;
      const course = await this.userUseCase.courseDetailes(courseId)
      if(course){
        res.send({success:true,course:course})
      }
   }
   async placeOrder(req:Request,res:Response,next:NextFunction){
      
      const session =  await stripe.checkout.sessions.create({
         payment_method_types:["card"],
         line_items:[
             {
               price_data:{
                   currency:'inr',
                   product_data:{
                       name:req.body.title,
                       images:[req.body.image.image_url]
                   },
                   unit_amount:Math.round(req.body.price*100)
               },
               quantity:1
             }
         ],
         mode:"payment",
         success_url:"http://localhost:5173/user/success",
         cancel_url:"http://localhost:5173/user/faile"
       })
       if(session){
        //  console.log('ivade');
         
         res.json({id:session.id})
       }

   }
  //  async addDB(req:Request,res:Response,next:NextFunction){
  //       // let signingsecret = process.env.PAYMENT_SECRET;
  //       // console.log(signingsecret);
  //       // const payload = req.body;
  //       // const sig = req.headers['stripe-signature'];
  //       // let event;
  //       // try {
  //       //     event = stripe.webhooks.constructEvent(req.body, sig!,signingsecret!); // Use your Stripe webhook secret here
  //       //   } catch (err) {
  //       //     console.log(`Webhook signature verification failed:`, err!);
  //       //     return res.sendStatus(400);
  //       //   }
  //       //   if(event.type === 'checkout.session.completed'){
  //       //      console.log(event.type);
             
  //       //   }
          
  //       const signingSecret ="whsec_f28e41dfd474df0782369478a49e7a5b99510037b22513f7c17b4931d530477c"
  //       const sig = req.headers['stripe-signature'] as string;
    
  //       try {
  //         //  console.log(req.body);
  //         console.log(signingSecret,"hi");
  //         const event = stripe.webhooks.constructEvent(req.body, sig, signingSecret);
  //         // console.log(signingSecret,"hi");
          
  //         if (event.type === 'checkout.session.completed') {
  //           const session = event.data.object as Stripe.Checkout.Session;
    
  //           console.log("Payment successful:", session.id);
    
  //           // Example: Save to DB (implement your DB logic here)
  //           // await this.userUseCase.saveOrder({
  //           //   sessionId: session.id,
  //           //   customerEmail: session.customer_details?.email,
  //           //   amountTotal: session.amount_total,
  //           //   currency: session.currency,
  //           //   paymentStatus: session.payment_status,
  //           // });
    
  //           res.status(200).json({ received: true });
  //         } else {
  //           res.status(400).json({ message: "Event not handled" });
  //         }
  //       } catch (err:any) {
  //         console.error("Webhook signature verification failed:", err.message);
  //         res.status(400).send(`Webhook Error: ${err.message}`);
  //       }
  //  }

}