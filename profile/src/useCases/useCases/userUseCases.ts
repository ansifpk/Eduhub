import { NextFunction } from "express";
import { IUserUseCase } from "../interfaces/useCasesInterfaces/IuserUseCases";
import { Iuser } from "../../entities/user";
import { IUserRepository } from "../interfaces/repositoryInterfaces/IuserRepository";
import { ICourse } from "../../entities/course";
import { ICart } from "../../entities/cart";
import { IRating } from "../../entities/ratings";
import { ICloudinary } from "../interfaces/serviceInterfaces/ICloudinery";
import { ErrorHandler } from "@eduhublearning/common";

export class UserUseCases implements IUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cloudinary:ICloudinary,
  ) {}

  async profileImage(userId: string,image:{ 
    profileImage?: Express.Multer.File[]
  }, next: NextFunction): Promise<Iuser | void> {
   try {
    const user = await this.userRepository.findById(userId);
    if(!user){
     return next(new ErrorHandler(400,"User Not Found"))
    }
    if(user.avatar.avatar_url){
      const profile =  await this.cloudinary.addFile(image.profileImage![0]);
      if(profile){
        const update =  await this.userRepository.uploadProfile(userId,{id:profile.public_id,avatar_url:profile.secure_url});
        if(update){
          return update;
        }
      }
    }else{
      const profile =  await this.cloudinary.updateFile(image.profileImage![0],user.avatar.id) 
      if(profile){
        const update =  await this.userRepository.uploadProfile(userId,{id:profile.public_id,avatar_url:profile.secure_url});
        if(update){
          return update;
        }
      }
    }
   } catch (error) {
     console.error(error)
   }
  }

  async editProfile(userId: string, name: string, thumbnail: string, aboutMe: string, next: NextFunction): Promise<Iuser | void> {
   try {
     const user = await this.userRepository.findById(userId);
     if(!user){
      return next(new ErrorHandler(400,"User Not Found"))
     }
     const updatedUser = await this.userRepository.findByIdAndUpdate(userId,name,thumbnail,aboutMe);
     if(updatedUser){
      return updatedUser;
     }
   } catch (error) {
    console.error(error)
   }
  }
  
  async createRating(instructorId: string, userId: string, review: string, stars: number, next: NextFunction): Promise<IRating | void> {
    try {
       const instructor = await this.userRepository.findById(userId);
       if(!instructor){
        return next(new ErrorHandler(400,"Instructor Not found"));
       }
       const checkRating = await this.userRepository.checkingRating(instructorId,userId);
       if(checkRating){
        return next(new ErrorHandler(400,"Already rated this instructor"));
       }
       
       const rating = await this.userRepository.createRating(instructorId, userId, review, stars)
       if(rating){
        return rating
       }
    } catch (error) {
      console.error(error)
    }
  }
  async getRating(instructorId: string, next: NextFunction): Promise<IRating[] | void> {
    try {
      const instructor = await this.userRepository.findById(instructorId);
      if(!instructor){
        return next(new ErrorHandler(400,"Instructor not found"));
      }

      const ratings = await this.userRepository.findAllrating(instructorId);
      if(ratings){
        return ratings
      }

    } catch (error) {
      console.error(error)
    }
  }
  async editRating(ratingId: string, review: string, stars: number, next: NextFunction): Promise<IRating | void> {
    try {
      const check = await this.userRepository.findRatinById(ratingId);
      if(!check){
        return next(new ErrorHandler(400,"Rating not found")); 
      }
      const rating = await this.userRepository.editRatinById(ratingId,review,stars)
      if(rating){
        return rating;
      } 
    } catch (error) {
      console.error(error)
    }
  }
  async deleteRating(ratingId: string, next: NextFunction): Promise<IRating | void> {
    try {
      const check = await this.userRepository.findRatinById(ratingId);
      if(!check){
        return next(new ErrorHandler(400,"Rating not found")); 
      }
      const rating = await this.userRepository.deleteRatinById(ratingId)
      if(rating){
        return rating;
      } 
    } catch (error) {
      console.error(error)
    }
  }

  async Cart(userId: string, next: NextFunction): Promise<ICart | void> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return next(new ErrorHandler(400, "User Not Fount"));
      }
      if (user.isBlock) {
        return next(new ErrorHandler(403, "Access Denied by Admin"));
      }
      const cart = await this.userRepository.findCart(userId);
      if (cart) {
        return cart;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addToCart(
    courseId: string,
    userId: string,
    next: NextFunction
  ): Promise<ICart | void> {
    try {
      const checkUser = await this.userRepository.findById(userId);
      if (!checkUser) {
        return next(new ErrorHandler(400, "User Not Fount"));
      }
      if (checkUser.isBlock) {
        return next(new ErrorHandler(403, "Access Denied by admin"));
      }

      const course = await this.userRepository.findCourse(courseId);
      if (!course) {
        return next(new ErrorHandler(400, "Course Not Found"));
      }
      const checkCart = await this.userRepository.findCart(userId);
      if (checkCart) {
        if (checkCart.courses.some((value:ICourse)=>value._id == courseId)) {
         
            const cart = await this.userRepository.removeFromCart(userId,courseId)
          if(cart){
            return cart;
          }
         
        }else{
        
          const cart = await this.userRepository.addToCart(userId, courseId);
          if (cart) {
            return cart;
          }
        }

      } else {
        const cart = await this.userRepository.createCart({ courseId, userId });
        if (cart) {
          return cart;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  //cart

  async findCourse(courseId: string): Promise<ICourse | void> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      console.error(error);
    }
  }
  async findCart(userId: string): Promise<ICart | void> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      console.error(error);
    }
  }

  async removeFromCart(
    courseId: string,
    userId: string,
    next: NextFunction
  ): Promise<ICart | void> {
    try {
      const checkUser = await this.userRepository.findById(userId);
      if (!checkUser) {
        return next(new ErrorHandler(400, "User Not Fount"));
      }
      if (checkUser.isBlock) {
        return next(new ErrorHandler(403, "Access Denied by admin"));
      }
      const course = await this.userRepository.findCourse(courseId);
      if (!course) {
        return next(new ErrorHandler(400, "Course Not Found"));
      }
      const cart = await this.userRepository.removeFromCart(userId,courseId);
      if(cart){
        console.log(cart,"main");
        return cart
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  //user
  createProfile(userData: Iuser, next: NextFunction): Promise<Iuser | void> {
    console.log(userData, "form kafka");

    throw new Error("Method not implemented.");
  }

  async userProfile(userId: string, next: NextFunction): Promise<Iuser | void> {
    try {
      const user = await this.userRepository.findById(userId);
      if(!user){
         return next(new ErrorHandler(400,"User Not Fount"))
      }
      return user

    } catch (error) {
      console.error(error);
    }
  }
}
