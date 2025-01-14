export interface ISubcription{
    _id:string,
    price:number,
    plan:string,
    instructorId?:string,
    description:string[],
    users:{
      _id:string,
      userId:string
    }[],
    createdAt:string
}