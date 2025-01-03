import { IOrder } from "../../../entities/order";
// import { ICourse } from "../../../entities/types/course";
import { ICourse } from "../../../entities/course";
import { Iuser } from "../../../entities/user";


export interface IUserRepository{
    create(userId:string,course:ICourse):Promise<ICourse|void>
    findAllCurses(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
    findUser(userId:string):Promise<Iuser|void>
    // findOrderById(orderId:string):Promise<IOrder|void>
    // findOrderById(orderId:string):Promise<IOrder|void>
}