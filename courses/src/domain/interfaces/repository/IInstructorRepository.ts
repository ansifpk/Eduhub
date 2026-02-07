import { ICourse } from "../../entities/course"
import { IRating } from "../../entities/ratings"
import { ISection } from "../../entities/section"
import { ITest } from "../../entities/tests"
import { Iuser } from "../../entities/user"


export interface IInstructorrepository{
    find(instructorId:string,search : string,sort:string,page:number):Promise<ICourse[]|void>
    findStudents(instructorId:string,search : string,sort:string,page:number):Promise<Iuser[]|void>
    get():Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
    findByIdWthPopulate(courseId:string):Promise<ICourse|void>
    create(courseData:ICourse):Promise<ICourse|void>
    upload(courseData:ISection):Promise<ISection|void>
    addSecton(courseId:string,sectionId:string):Promise<ICourse|void>
    editSecton(sectionId:string,sectionData:ISection):Promise<ISection|void>
    list(courseId:string,isListed:boolean):Promise<ICourse|void>
    edit(courseData:ICourse):Promise<ICourse|void>
    creatTest(testData:ITest):Promise<ITest|void>
    editTest(testId:string,testData:ITest):Promise<ITest|void>
    addTest(courseId:string,testId:string):Promise<ICourse|void>
    findTest(testId:string):Promise<ITest|void>
    findTop5(userId:string):Promise<ICourse[]|void>
    findTopRated(userId:string):Promise<IRating[]|void>

}