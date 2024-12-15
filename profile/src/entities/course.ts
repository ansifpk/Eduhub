

export interface ICourse{
    _id?:string,
    title:string,
    instructorId:string,
    subCategory:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    subscription:boolean,
    image:{
        _id:string,
        image_url:string
    },
}

