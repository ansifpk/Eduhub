import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetCourses } from "../../../domain/interfaces/admin/IGetCourses";

export class GetCoursesController implements IController {
    constructor(private readonly _useCase:IGetCourses) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
            const {search,sort,page} = req.query;
            const courses = await this._useCase.execute({search:search as string,sort:sort as string,page:parseInt(page as string)});
            if(courses){
              res.status(StatusCodes.OK).send({courses:courses.courses,pages:courses.pages})
            }
        } catch (error) {
            next(error);
        }
    }
}