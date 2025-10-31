export interface ISubcription{
    _id:string,
    price:number,
    plan:string,
    description:string[],
    productId:string,
    priceId:string,
    users:{
        _id:string,
        userId:string
    }[],
}