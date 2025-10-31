import { IRating } from "../../entities/ratings";
import { Iuser } from "../../entities/user";


export interface IInstructorRepository{
    // user
    findByEmail(userEmail:string):Promise<Iuser|void>
    findById(userId:string):Promise<Iuser|void>
    update(userData:{email:string,qualification:string,experience:string,certificate:{id:string,certificate_url:string},cv:{id:string,cv_url:string}}):Promise<Iuser|void>
    findRatings(userId:string):Promise<IRating[]|void>
   
   
}