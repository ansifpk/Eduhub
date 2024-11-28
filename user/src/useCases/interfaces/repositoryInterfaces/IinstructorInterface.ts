import { Iuser } from "../../../entities/user";


export interface IInstructorRepository{
    findByEmail(userEmail:string):Promise<Iuser|void>
    update(userData:{email:string,qualification:string,experience:string,certificate:{id:string,certificate_url:string},cv:{id:string,cv_url:string}}):Promise<Iuser|void>


}