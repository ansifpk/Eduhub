import { ICourse } from "../../entities/course";

export interface IPlaceOrder{
   execute(input: {
    course: ICourse[];
    userId: string;
    couponCode: string;
  }): Promise<string | void>
}