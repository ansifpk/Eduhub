
interface ICourse{
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
  user:object,
  product:ICourse,
  orderDate:string
}