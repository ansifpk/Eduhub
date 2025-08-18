import { Iuser } from "../../../../entities/user";
import { IAdminRepository } from "../../../../useCases/interfaces/repositoryInterfaces/IadminRepository";
import { ratingModel } from "../models/ratingModel";
import { userModel } from "../models/userModel";

export class AdminRepository implements IAdminRepository {
  constructor(
    private userModels: typeof userModel,
    private ratingModels: typeof ratingModel
  ) {}

  async getUserPages(search: string, sort: string): Promise<number | void> {
    try {
      let queryData: any = {};
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

      if (search) {
        queryData.name = { $regex: search, $options: "i" };
      }

      const limit = 4;
      const pages = await this.userModels
        .find({ isAdmin: false })
        .countDocuments({ ...queryData });
      const count = Math.ceil(pages / limit);
      if (pages >= 0) {
        return count;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getInstructorPages(
    search: string,
    sort: string
  ): Promise<number | void> {
    try {
      let queryData: any = {
        isAdmin: false,
        $or: [{ status: "pending" }, { status: "Approved" }],
      };
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

      if (search) {
        queryData.name = { $regex: search, $options: "i" };
      }
      const limit = 4;
      const pages = await this.userModels.countDocuments({ ...queryData });
      const count = Math.ceil(pages / limit);
      if (pages >= 0) {
        return count;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findTop5Instructors(): Promise<Iuser[] | void> {
    try {
      const instructors = await this.userModels.aggregate([
        {
          $match: { isInstructor: true },
        },
        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "instructorId",
            as: "instructorReviews",
          },
        },
      ]);

      if (instructors) {
        return instructors;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async find(
    search: string,
    sort: string,
    page: number
  ): Promise<Iuser[] | void> {
    try {
      let queryData: any = { isAdmin: false };
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

      if (search) {
        queryData.name = { $regex: search, $options: "i" };
      }
      let limit = 4;
      const students = await this.userModels
        .find({ ...queryData })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortQuery);
      if (students) {
        return students;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findByEmail(email: string): Promise<Iuser | void> {
    try {
      const user = await this.userModels.findOne({ email: email });
      if (user) {
        return user;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async approveIntructor(
    email: string,
    status: string,
    instructor: boolean
  ): Promise<Iuser | void> {
    try {
      const user = await this.userModels.findOneAndUpdate(
        { email: email },
        { $set: { status: status, isInstructor: instructor } },
        { new: true }
      );
      if (user) {
        return user;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findIntructorRequests(search:string,page:string,sort:string): Promise<Iuser[] | void> {
    try {
      const sortQuery:any = {};
        switch (sort) {
        case "Name Aa-Zz":
          sortQuery.name = 1;
          break;
        case "Name Zz-Aa":
          sortQuery.name = -1;
          break;
        case "Old":
          sortQuery.createdAt = 1;
          break;
        default:
          sortQuery.createdAt = -1;
          break;
      }
      const limit = 4;
      const requests = await this.userModels.aggregate([
        {
          $facet: {
            requests: [
              { $match: { name: { $regex: search, $options: "i" } , isAdmin: false, status: "pending" } },
              {$sort:sortQuery},
              {$skip:(Number(page)-1)*limit},
              { $limit: limit }
            ],
            totelPages: [
              { $match: { name: { $regex: search, $options: "i" } , isAdmin: false, status: "pending" } },
              {
                $group: {
                  _id: null,
                  totelPages: { $sum: 1 },
                },
              },
              {
                $project: {
                  totelPages: {
                    $ceil: {
                      $divide: ["$totelPages", limit],
                    },
                  },
                },
              },
            ],
          },
        },
      ]);
      if (requests) {
        return requests;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findInstructors(
    search: string,
    sort: string,
    page: number
  ): Promise<Iuser[] | void> {
    try {
      let queryData: any = {
        isAdmin: false,
        $or: [{ status: "pending" }, { status: "Approved" }],
      };
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

      if (search) {
        queryData.name = { $regex: search, $options: "i" };
      }
      let limit = 4;
      const users = await this.userModels.aggregate([
        {
          $facet: {
            instructors: [
              {
                $match: {
                  name: { $regex: search, $options: "i" },
                  isInstructor: true,
                },
              },
              { $sort: sortQuery },
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
            requests: [
              { $match: { status: "pending" } },
              {
                $group: {
                  _id: null,
                  totelRequests: { $sum: 1 },
                },
              },
            ],
            instructorTotalPages: [
              {
                $match: {
                  name: { $regex: search, $options: "i" },
                  isInstructor: true,
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                },
              },
              {
                $project: {
                  totalPages: {
                    $ceil: {
                      $divide: ["$total", limit],
                    },
                  },
                },
              },
            ],
          },
        },
      ]);
      if (users) {
        return users;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
