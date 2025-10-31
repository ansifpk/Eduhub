
import { ICart } from "../../../domain/entities/cart";
import { ICourse } from "../../../domain/entities/course";
import { IRating } from "../../../domain/entities/ratings";
import { Iuser } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/repositoryInterfaces/IuserRepository";
import { cartModel } from "../models/cart";
import { courseModel } from "../models/courseModel";
import { ratingModel } from "../models/ratingModel";
import { userModel } from "../models/userModel";

export class UserRepository implements IUserRepository {
  constructor(
    private userModels: typeof userModel,
    private cartModels: typeof cartModel,
    private courseModels: typeof courseModel,
    private ratingModels: typeof ratingModel
  ) {}
  async uploadProfile(userId: string, avatar: { id: string; avatar_url: string; }): Promise<Iuser | void> {
    try {
      const user = await this.userModels.findByIdAndUpdate({_id:userId},{$set:{avatar:avatar}},{new:true});
      if(user) {
       return user;
      }
      
    } catch (error) {
     console.error(error)
    }
  }

  async findByIdAndUpdate(userId: string, name: string, thumbnail: string, aboutMe: string): Promise<Iuser | void> {
   try {
     const user = await this.userModels.findByIdAndUpdate({_id:userId},{$set:{name:name,thumbnail:thumbnail,about:aboutMe}},{new:true});
     if(user) {
      return user;
     }
     
   } catch (error) {
    console.error(error)
   }
  }

  async createRating(
    instructorId: string,
    userId: string,
    review: string,
    stars: number
  ): Promise<IRating | void> {
    try {
      const rating = await this.ratingModels.create({
        userId: userId,
        instructorId: instructorId,
        review: review,
        stars: stars,
      });
      if (rating) {
        return rating;
      }
    } catch (error) {}
  }
  async findAllrating(instructorId: string): Promise<IRating[] | void> {
    try {
      const ratings = await this.ratingModels
        .find({ instructorId: instructorId })
        .populate("userId");
      if (ratings) {
        return ratings;
      }
    } catch (error) {}
  }
  async findRatinById(ratingId: string): Promise<IRating | void> {
    try {
      const rating = await this.ratingModels.findById({ _id: ratingId });
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async editRatinById(
    ratingId: string,
    review: string,
    stars: number
  ): Promise<IRating | void> {
    try {
      const rating = await this.ratingModels.findByIdAndUpdate(
        { _id: ratingId },
        { $set: { review: review, stars: stars } },
        { new: true }
      );
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async deleteRatinById(ratingId: string): Promise<IRating | void> {
    try {
      const rating = await this.ratingModels.findByIdAndDelete({
        _id: ratingId,
      });
      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async checkingRating(
    instructorId: string,
    userId: string
  ): Promise<IRating | void> {
    try {
      const rating = await this.ratingModels.findOne({
        instructorId: instructorId,
        userId: userId,
      });

      if (rating) {
        return rating;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createCart(cartData: {
    userId: string;
    courseId: string;
  }): Promise<ICart | void> {
    try {
      const cart = await this.cartModels.create({
        userId: cartData.userId,
        courses: [cartData.courseId],
      });
      if (cart) return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async findCourse(id: string): Promise<ICourse | void> {
    try {
       const course = await this.courseModels.findById(id);
      if (course) return course;
    } catch (error) {
      console.error(error);
    }
  }
  async findCart(userId: string): Promise<ICart | void> {
    try {
      const cart = await this.cartModels.findOne({ userId: userId }).populate({
        path: "courses",
        populate: {
          path: "instructorId",
        },
      });
      if (cart) {
        return cart;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async addToCart(userId: string, courseId: string): Promise<ICart | void> {
    try {
      const cart = await this.cartModels
        .findOneAndUpdate(
          { userId: userId },
          { $push: { courses: courseId } },
          { new: true }
        )
        .populate("courses");

      if (cart) {
        return cart;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async removeFromCart(
    userId: string,
    courseId: string
  ): Promise<ICart | void> {
    try {
      const cart = await this.cartModels
        .findOneAndUpdate(
          { userId: userId },
          { $pull: { courses: courseId } },
          { new: true }
        )
        .populate("courses");
      if (cart) {
        return cart;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findById(userId: string): Promise<Iuser | void> {
    try {
      const user = await this.userModels.findById({ _id: userId });
      if (user) {
        return user;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
