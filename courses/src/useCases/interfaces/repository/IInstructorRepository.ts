import { ICourse } from "../../../entities/course";
import { ISection } from "../../../entities/section";
import { ITest } from "../../../entities/test";
import { Iuser } from "../../../entities/user";

export interface IInstructorrepository{
    find(instructorId:string,search : string,sort:string):Promise<ICourse[]|void>
    get():Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
    create(courseData:ICourse):Promise<ICourse|void>
    upload(courseData:ISection):Promise<ISection|void>
    addSecton(courseId:string,sectionId:string):Promise<ICourse|void>
    editSecton(sectionData:ISection):Promise<ISection|void>
    list(courseId:string,isListed:boolean):Promise<ICourse|void>
    edit(courseData:ICourse):Promise<ICourse|void>
    creatTest(testData:ITest):Promise<ITest|void>
    editTest(testId:string,testData:ITest):Promise<ITest|void>
    addTest(courseId:string,testId:string):Promise<ICourse|void>
    findTest(testId:string):Promise<ITest|void>
    findTop5(userId:string):Promise<ICourse[]|void>
    findTopRated(userId:string):Promise<ICourse[]|void>
}