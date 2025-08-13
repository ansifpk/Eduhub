import { DeleteResult } from "mongoose";
import { ICoupon } from "../../../entities/coupon";
import { ICourse } from "../../../entities/course";
import { IReport } from "../../../entities/report";
import { ISection } from "../../../entities/section";
import { IAdminRepository } from "../../../useCases/interfaces/repository/IAdminRepository";
import { couponModel } from "../mongodb/models/couponsModel";
import { Course } from "../mongodb/models/courseModel";
import { reportModel } from "../mongodb/models/reportModel";
import { SectionModel } from "../mongodb/models/sectionModel";

export class AdminRepository implements IAdminRepository {
  constructor(
    private courseModel: typeof Course,
    private couponModels: typeof couponModel,
    private reportModels: typeof reportModel,
    private sectionModel: typeof SectionModel
  ) {}

  async deleteLecture(lectureUrl: string): Promise<ISection | void> {
    try {
      const updatedSection = await SectionModel.findOneAndUpdate(
        { "lectures.content.video_url": lectureUrl },
        { $pull: { lectures: { "content.video_url": lectureUrl } } },
        { new: true }
      );
      if (updatedSection) {
        console.log("updatedSection", updatedSection);

        return updatedSection;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findReports(): Promise<IReport[] | void> {
    try {
      const reports = await this.reportModels
        .find()
        .sort({ createdAt: -1 })
        .populate("courseId")
        .populate("userId");
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async createCoupon(
    title: string,
    description: string,
    offer: number,
    startingDate: string,
    expiryDate: string,
    couponCode: string
  ): Promise<ICoupon | void> {
    try {
      const coupon = await this.couponModels.create({
        title,
        startingDate,
        expiryDate,
        offer,
        description,
        couponCode,
      });
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findReportsByUrl(lectureUrl: string): Promise<DeleteResult | void> {
    try {
      const reports = await this.reportModels.deleteMany({
        content: lectureUrl,
      });
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCoupon(couponId: string): Promise<ICoupon | void> {
    try {
      const couponse = await this.couponModels.findByIdAndDelete({
        _id: couponId,
      });
      if (couponse) {
        return couponse;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async editCoupon(
    couponId: string,
    title: string,
    description: string,
    offer: number,
    startingDate: string,
  
    expiryDate: string,
 
    couponCode: string
  ): Promise<ICoupon | void> {
    try {
      const couponse = await this.couponModels.findByIdAndUpdate(
        { _id: couponId },
        {
          $set: {
            title: title,
            description: description,
            offer: offer,
            startingDate: startingDate,
            expiryDate: expiryDate,
            couponCode: couponCode,
          },
        },
        { new: true }
      );
      if (couponse) {
        return couponse;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async coupons(
    search: string,
    sort: string,
    page: string
  ): Promise<ICoupon[] | void> {
    try {
      let sortQuery: any = {};

      switch (sort) {
        case "All":
          sortQuery.createdAt = -1;
          break;
        case "Name Aa-Zz":
          sortQuery.name = 1;
          break;
        case "Name Zz-Aa":
          sortQuery.name = -1;
          break;
        case "Old":
          sortQuery.createdAt = 1;
          break;
        case "New":
          sortQuery.createdAt = -1;
          break;
        default:
          sortQuery.createdAt = -1;
          break;
      }

      const limit = 5;
      const skip = (Number(page) - 1) * limit;
      const couponse = await this.couponModels.aggregate([
        {
          $facet: {
            data: [
              { $match: { title: { $regex: search, $options: "i" } } },
              { $sort: sortQuery },
              { $skip: skip },
              { $limit: limit },
            ],
            count: [{ $count: "total" }],
          },
        },
        {
          $project: {
            data: 1,
            totalPage: {
              $ceil: {
                $divide: [{ $arrayElemAt: ["$count.total", 0] }, limit],
              },
            },
          },
        },
      ]);

      if (couponse) {
        return couponse;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async find(
    search: string,
    sort: string,
    page: number
  ): Promise<ICourse[] | void> {
    try {
      let queryData: any = {};
      let sortQuery: any = {};

      switch (sort) {
        case "Name Aa-Zz":
          sortQuery.title = 1;
          break;
        case "Name Zz-Aa":
          sortQuery.title = -1;
          break;
        case "Old":
          sortQuery.createdAt = 1;
          break;
        default:
          sortQuery.createdAt = -1;
          break;
      }

      if (search) {
        queryData.title = { $regex: search, $options: "i" };
      }

      let limit = 4;
      const courses = await this.courseModel
        .find({ ...queryData })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortQuery)
        .populate("students")
        .populate("sections")
        .exec();

      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
    }
  }

  list(courseId: string): Promise<ICourse | void> {
    throw new Error("Method not implemented.");
  }

  async getPages(search: string, sort: string): Promise<number | void> {
    try {
      let queryData: any = {};
      if (search) {
        queryData.title = { $regex: search, $options: "i" };
      }
      const limit = 4;
      const pages = await this.courseModel.countDocuments({ ...queryData });
      const count = Math.ceil(pages / limit);
      if (pages >= 0) {
        return count;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findCouponById(couponId: string): Promise<ICoupon | void> {
    try {
      const couponse = await this.couponModels.findById({ _id: couponId });
      if (couponse) {
        return couponse;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findTop5(): Promise<ICourse[] | void> {
    try {
      const courses = await this.courseModel.find();

      if (courses) {
        return courses
          .sort((a, b) => b.students!.length - a.students!.length)
          .slice(0, 5);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async top5Rated(): Promise<ICourse[] | void> {
    try {
      // const courses = await this.courseModel.find()
      const courses = await this.courseModel.aggregate([
        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "courseId",
            as: "courseReviews",
          },
        },
      ]);

      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
