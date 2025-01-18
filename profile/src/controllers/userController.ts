import { NextFunction, Request, Response } from "express";
import { userUseCase } from "../framwork/webServer/routes/injections/injections";
import { IUserUseCase } from "../useCases/interfaces/useCasesInterfaces/IuserUseCases";
import { UserProfileUpdatedPublisher } from "../framwork/webServer/config/kafka/producers/user-profile-updated-producer";
import kafkaWrapper from "../framwork/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";


export class UserController{
   
    constructor(
        private userUseCase:IUserUseCase
    ){ }
    async createProfile(req:Request,res:Response,next:NextFunction){
       const user = await this.userUseCase.createProfile(req.body,next)
    }
    async userProfile(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params
         const userProfile =  await this.userUseCase.userProfile(userId,next)
         if(userProfile){
            res.send({success:true,userData:userProfile})
         }
    }

    async editProfile(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params
        const {name,thumbnail,aboutMe} = req.body;
         const userProfile =  await this.userUseCase.editProfile(userId,name,thumbnail,aboutMe,next)
         if(userProfile){
            await new  UserProfileUpdatedPublisher(kafkaWrapper.producer as Producer).produce({
               _id: userProfile._id,
               name: userProfile.name
            })
            res.send({success:true,user:userProfile})
         }
    }

    async addToCart(req:Request,res:Response,next:NextFunction){
        const {courseId,userId} = req.body;
         const cart =  await this.userUseCase.addToCart(courseId,userId,next)
         if(cart){
            return res.send({success:true,cart:cart})
         }
    }

    async removeFromCart(req:Request,res:Response,next:NextFunction){
        const {courseId,userId} = req.params;
         const cart =  await this.userUseCase.removeFromCart(courseId,userId,next)
         if(cart){
            return res.send({success:true,cart:cart})
         }
    }

    async Cart(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params;
         const cart =  await this.userUseCase.Cart(userId,next)
         if(cart){
            return res.send({success:true,cart:cart})
         }
    }

    async ratings(req:Request,res:Response,next:NextFunction){
      try {
          const {instructorId} = req.params
           const ratings = await this.userUseCase.getRating(instructorId,next)
           if(ratings){
            return res.send({success:true,ratings:ratings})
           }
      } catch (error) {
         console.error(error)
      }
    }

    async createRating(req:Request,res:Response,next:NextFunction){
      try {
         const {instructorId,review,userId,stars} = req.body
     
         const rating = await this.userUseCase.createRating(instructorId,userId,review,stars,next)
         if(rating){
            return res.send({success:true,rating:rating})
         }
      } catch (error) {
         console.error(error)
      }
    }

    async editRating(req:Request,res:Response,next:NextFunction){
      try {
         
          const {ratingId,review,stars} = req.body
          console.log(req.body);
          
          const rating =await this.userUseCase.editRating(ratingId,review,stars,next);
          if(rating){
            return res.send({success:true,rating:rating})
          }
      } catch (error) {
         console.error(error)
      }
    }
    async deleteRating(req:Request,res:Response,next:NextFunction){
      try {
         const {ratingId}  =req.params
         const rating =await this.userUseCase.deleteRating(ratingId,next);
          if(rating){
            return res.send({success:true,rating:rating})
          }
      } catch (error) {
         console.error(error)
      }
    }

    async profileImage(req:Request,res:Response,next:NextFunction){
      try {
         const {userId}  = req.params;
         let files = req.files as {
            profileImage: Express.Multer.File[];
          };

         const user =await this.userUseCase.profileImage(userId,files,next);
          if(user){
            return res.send({success:true,user})
          }
      } catch (error) {
         console.error(error)
      }
    }

   
}