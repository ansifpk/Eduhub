import { IOrder } from "../../../entities/order";
import { ICourse } from "../../../entities/types/course";


export interface IUserRepository{
    create(data:ICourse):Promise<IOrder|void>
    findAllCurses(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
}