import { ICourse } from "../../../entities/course";
interface Course{
    _id?:string,
    title:string,
    instructorId?:string,
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test?:[];
    subscription:boolean,
    videos:string[],
    image:string,
    imageUrl?:string,
    videoUrl?:string[],
    createdAt:string,
}
export interface IInstructorrepository{
    find(instructorId:string):Promise<ICourse[]|void>
    get():Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
    create(courseData:ICourse):Promise<ICourse|void>
    list(courseId:string,isListed:boolean):Promise<ICourse|void>
    edit(courseData:ICourse):Promise<ICourse|void>
}