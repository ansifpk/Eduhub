
export interface ICourse{
    _id?:string,
    instructorId?:string,
    title:string,
    description:string,
    thumbnail:string,
    category:string,
    topic:string,
    test?:[];
    subsription:boolean,
    videos:[],
    image:string,
    createAt:string,
}