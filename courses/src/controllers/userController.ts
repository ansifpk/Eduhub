import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";
import Stripe from "stripe";
import dotenv from 'dotenv';
import { Query } from "../framWorks/webServer/types/type";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET!,{apiVersion:'2024-11-20.acacia'})

export class UserController{
   constructor(
    private userUseCase:IUserUseCase
   ){}

   async fetchCourses(req:Request,res:Response,next:NextFunction){
  
      const {category,level,topic,search} = req.query
      const courses = await this.userUseCase.fetchCourses(category as string,topic as string,level as string,search as string)
      if(courses){ 
        res.send({success:true,courses:courses})
      }
   }
   async getCourses(req:Request,res:Response,next:NextFunction){
  
      const {instructorId} = req.params;
      const courses = await this.userUseCase.getCourses(instructorId,next)
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

   async purchasedCourses(req:Request,res:Response,next:NextFunction){
      const  {userId} = req.params;
      
      
      const course = await this.userUseCase.purchasedCourses(userId,next)
      if(course){
        res.send({success:true,course:course})
      }
   }

   async placeOrder(req:Request,res:Response,next:NextFunction){
   console.log(req.body)
      
      const session =  await stripe.checkout.sessions.create({
         payment_method_types:["card"],
         line_items:[
             {
               price_data:{
                   currency:'inr',
                   product_data:{
                       name:req.body.course.title,
                       images:[req.body.course.image.image_url]
                   },
                   unit_amount:Math.round(parseInt(req.body.course.price)*100)
               },
               quantity:1
             }
         ],
         mode:"payment",
        //  success_url:"https://eduhub.dev/user/success",
        //  cancel_url:"https://eduhub.dev/user/faile"
         success_url:"http://localhost:5173/user/success",
         cancel_url:"https://localhost:5173/user/faile"
       })
       if(session){
        //  console.log('ivade');
         
         res.json({id:session.id})
       }

   }

   async rating(req:Request,res:Response,next:NextFunction){
       const {review,stars,courseId,userId} = req.body
       const rating = await this.userUseCase.ratingCourse(courseId,userId,review,stars,next)
       if(rating){
       return res.send({success:true,rating:rating})
       }
   }

   async getRatings(req:Request,res:Response,next:NextFunction){
       const {courseId} = req.params
       const ratings = await this.userUseCase.getRatings(courseId,next)
       if(ratings){
       return res.send({success:true,rating:ratings})
       }
   }

   async updateRating(req:Request,res:Response,next:NextFunction){
       const {ratingId,review,stars} = req.body
       const ratings = await this.userUseCase.updateRating(ratingId,review,stars,next)
       if(ratings){
       return res.send({success:true,rating:ratings})
       }
   }

   async deleteRating(req:Request,res:Response,next:NextFunction){
       const {ratingId} = req.params
       console.log(ratingId);
       
       const ratings = await this.userUseCase.deleteRating(ratingId,next)
       if(ratings){
       return res.send({success:true,rating:ratings})
       }
   }
}