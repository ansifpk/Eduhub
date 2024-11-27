import { IOrder } from "../../../entities/order";
import { ICourse } from "../../../entities/types/course";


export interface IInstructorRepository{
    orders():Promise<IOrder[]|void>
}