import { NextFunction } from "express";
import { ICourse } from "../../../entities/types/course";
import { IOrder } from "../../../entities/order";

export interface IInstructorUseCase{
    orders():Promise<IOrder[]|void>
}