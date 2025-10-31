import mongoose from "mongoose";
import { ICourse } from "../../../domain/entities/course";
import { IRating } from "../../../domain/entities/ratings";
import { ISection } from "../../../domain/entities/section";
import { ITest } from "../../../domain/entities/test";
import { Iuser } from "../../../domain/entities/user";
import { IInstructorrepository } from "../../../domain/interfaces/repository/IInstructorRepository";
import { Course } from "../models/courseModel";
import { ratingModel } from "../models/ratingModel";
import { SectionModel } from "../models/sectionModel";
import { testModel } from "../models/testModel";


export class InstructorRepository implements IInstructorrepository {
  constructor(
    private courseModel: typeof Course,
    private sectionModel: typeof SectionModel,
    private testModels: typeof testModel,
    private ratingModels: typeof ratingModel
  ) {}
  async findStudents(
    instructorId: string,
    search: string,
    sort: string,
    page: number,
  ): Promise<Iuser[] | void> {
    try {
      let sortQuery:any = {};
      switch (sort) {
        case "Name A-Z":
          sortQuery.name = 1;
          break;
        case "Name Z-A":
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
      const skip = (page - 1) * limit;
      const students = await this.courseModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "students",
            foreignField: "_id",
            as: "students",
          },
        },
        { $unwind: "$students" },
        { $match: { instructorId: new mongoose.Types.ObjectId(instructorId) } },
        {
          $group: {
            _id: "$students",
          },
        },
        { $replaceRoot: { newRoot: "$_id" } },
        {
          $facet: {
            data: [
              {$match:{name:{$regex:search,$options:"i"}}},
              { $sort: sortQuery},
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
      return students;
    } catch (error) {
      console.error(error);
    }
  }
  async findTest(testId: string): Promise<ITest | void> {
    try {
      const test = await this.testModels.findById({ _id: testId });
      if (test) {
        return test;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async editTest(testId: string, testData: ITest): Promise<ITest | void> {
    try {
      const testUpdated = await this.testModels.findByIdAndUpdate(
        { _id: testId },
        { $set: { test: testData } },
        { new: true }
      );
      if (testUpdated) {
        return testUpdated;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async addTest(courseId: string, testId: string): Promise<ICourse | void> {
    try {
      const course = await this.courseModel.findByIdAndUpdate(
        { _id: courseId },
        { $set: { test: testId } },
        { new: true }
      );
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async creatTest(testData: ITest): Promise<ITest | void> {
    try {
      const test = await this.testModels.create({
        test: testData,
      });
      if (test) {
        return test;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addSecton(
    courseId: string,
    sectionId: string
  ): Promise<ICourse | void> {
    try {
      const course = await this.courseModel.findOneAndUpdate(
        { _id: courseId },
        { $set: { sections: sectionId } },
        { new: true }
      );
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async editSecton(
    sectionId: string,
    sectionData: ISection
  ): Promise<ISection | void> {
    try {
      const section = await this.sectionModel.findOneAndUpdate(
        { _id: sectionId },
        {
          $set: {
            sections: sectionData.sections,
          },
        },
        { new: true }
      );
      if (section) {
        return section;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async upload(sectionData: ISection): Promise<ISection | void> {
    try {
      const course = await this.sectionModel.create(sectionData);
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async get(): Promise<ICourse[] | void> {
    try {
      const course = await this.courseModel
        .find()
        .sort({ createdAt: -1 })
        .populate("sections");
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async find(
    instructorId: string,
    search: string,
    sort: string,
    page: number
  ): Promise<ICourse[] | void> {
    try {
      const limit = 5;
      const skip = (page - 1) * limit;
      let sortQuery: any = {};
      switch (sort) {
        case "Name A-Z":
          sortQuery.name = 1;
          break;
        case "Name Z-A":
          sortQuery.name = -1;
          break;
        case "Price Low-High":
          sortQuery.price = 1;
          break;
        case "Price High-Low":
          sortQuery.price = -1;
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

      const courses = await this.courseModel.aggregate([
        {
          $match: {
            instructorId: new mongoose.Types.ObjectId(instructorId),
            title: { $regex: search, $options: "i" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "students",
            foreignField: "_id",
            as: "students",
          },
        },
        {
          $lookup: {
            from: "tests",
            localField: "test",
            foreignField: "_id",
            as: "test",
          },
        },
        {
          $facet: {
            data: [
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
       
      if (courses) {
        return courses;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findById(courseId: string): Promise<ICourse | void> {
    try {
      const course = await this.courseModel
        .findById({ _id: courseId })
        .populate("instructorId")
        .populate("students");
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findByIdWthPopulate(courseId: string): Promise<ICourse | void> {
    try {
      const course = await this.courseModel
        .findById({ _id: courseId })
        .populate("instructorId")
        .populate("students")
        .populate("sections");
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findTop5(userId: string): Promise<ICourse[] | void> {
    try {
      const course = await this.courseModel.aggregate([
        { $match: { instructorId: new mongoose.Types.ObjectId(userId) } },
        { $addFields: { skillsCount: { $size: "$students" } } },
        { $sort: { skillsCount: -1 } },
        { $project: { skillsCount: 0 } },
        // { $limit: 5 },
      ]);
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findTopRated(userId: string): Promise<IRating[] | void> {
    try {
      const ratings = await this.ratingModels.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseId",
          },
        },
        {$unwind:"$courseId"},
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {$unwind:"$userId"},
        {$match:{"courseId.instructorId":new mongoose.Types.ObjectId(userId),stars:{$gt:2}}},
      ]);
      if (ratings) {
        return ratings;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async create(courseData: ICourse): Promise<ICourse | void> {
    try {
      const course = await this.courseModel.create(courseData);
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async list(courseId: string, isListed: boolean): Promise<ICourse | void> {
    try {
      const course = await this.courseModel.findByIdAndUpdate(
        { _id: courseId },
        { $set: { isListed: !isListed } },
        { new: true }
      );

      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async edit(courseData: ICourse): Promise<ICourse | void> {
    try {
      const {
        title,
        category,
        subCategory,
        level,
        thumbnail,
        description,
        price,
        image,
        _id,
      } = courseData;

      const course = await this.courseModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            title,
            category,
            subCategory,
            level,
            thumbnail,
            description,
            price,
            image,
          },
        },
        { new: true }
      );
      if (course) {
        return course;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //     async findById(courseId: string): Promise<ICourse | void> {
  //         const course = await this.courseModel.findById({_id:courseId});
  //         if(course){
  //           return course;
  //         }
  //     }

  //    async find(instructorId:string): Promise<Course[]| void> {
  //         const data = await this.courseModel.find({instructorId:instructorId}).sort({createdAt:-1});
  //         if(data){
  //             return data;
  //         }
  //     }

  //     async create(courseData: ICourse): Promise<Course | void> {
  //         const data = await this.courseModel.create(courseData) as ICourse
  //         if(data){
  //             return data;
  //         }
  //     }

  //    async  list(course: ICourse): Promise<ICourse | void> {
  //         const updatedCourse = await this.courseModel.findByIdAndUpdate({_id:course._id},{$set:{isListed:!course.isListed}},{new:true});
  //         if(updatedCourse){
  //             return updatedCourse
  //         }
  //     }

  //     async edit(courseData: ICourse): Promise<ICourse | void> {
  //         const course = await this.courseModel.findByIdAndUpdate({_id:courseData._id},{$set:{title:courseData.title,thumbnail:courseData.thumbnail,description:courseData.description,category:courseData.category,subCategory:courseData.subCategory,level:courseData.level,price:courseData.price,image:courseData.image,videos:courseData.videos}},{new:true})
  //         if(course){
  //             return course;
  //         }
  //     }
}
