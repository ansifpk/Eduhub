import { IOrder } from "../../../entities/order";
// import { ICourse } from "../../../entities/types/course";
import { ICourse } from "../../../entities/course";


export interface IUserRepository{
    create(data:IOrder):Promise<IOrder|void>
    findAllCurses(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
}