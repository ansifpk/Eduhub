
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
    isted:boolean,
    createdAt:string,
    
}

export interface IOrder{
  _id:string,
  user:string,
  product:ICourse,
  purchaseMethord:string,
  orderDate:string
}