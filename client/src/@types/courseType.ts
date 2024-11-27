
export interface ICourse{
    _id:string,
    title:string,
    instructorId:{
        _id:string,
        name:string
    },
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test?:[];
    subscription:boolean,
    image:{
        _id:string,
        image_url:string
    },
    students?:string[],
    createdAt:string,
    sessions:{
        sessionTitle:string,
        lectures:[{
            id:string,
            content:string,
            duration:string,
            title:string,
        }]
    }[],
}