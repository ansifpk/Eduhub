import { Iuser } from "./user";

interface ICourse{
   _id:string,
    instructorId:string,
    title:string,
    subCategory:string,
    level:string,
    thumbnail:string,
    category:string,
    image:string,
    subscription:boolean,
    students:Iuser[],
    isListed:boolean,
    createdAt:string,
    price:number
}

export interface IOrder{
  _id:string,
  user:Iuser,
  course:ICourse,
  orderDate:string,
  discountAmount:number,
  createdAt:Date
}