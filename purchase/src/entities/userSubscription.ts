export interface IUserSubcription{
    _id:string,
    price:number,
    plan:string,
    description:string[],
    users:{
        _id:string,
        userId:string
    }[],
    instructorId:string,
    priceId:string,
    productId:string,
}