
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
  user:{
    id:string,
    name:string,
    email:string,
    createdAt:Date
  },
  product:ICourse,
  orderDate:string
}