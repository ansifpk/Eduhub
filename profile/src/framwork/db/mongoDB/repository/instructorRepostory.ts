import { ICourse } from "../../../../entities/course";
import { IRating } from "../../../../entities/ratings";
import { Iuser } from "../../../../entities/user";
import { IInstructorRepository } from "../../../../useCases/interfaces/repositoryInterfaces/IinstructorInterface";
import { ratingModel } from "../models/ratingModel";
import { userModel } from "../models/userModel";


export class InstructorRepository implements IInstructorRepository{
    constructor(
        private userModels:typeof userModel,
        private ratingModels:typeof ratingModel,
    ){}

    async findRatings(userId: string): Promise<IRating[] | void> {
        try {
            const user = await this.ratingModels.find({instructorId:userId}).sort({createdAt:-1}).limit(5).populate("userId")
            if(user){
               return user
            }
          } catch (error) {
           
          }
    }

    // user

    async findById(userId: string): Promise<Iuser | void> {
       try {
         const user = await this.userModels.findById({_id:userId})
         if(user){
            return user
         }
       } catch (error) {
        
       }
    }
  
    async findByEmail(userEmail: string): Promise<Iuser | void> {
        try {
            const user = await this.userModels.findOne({email:userEmail});
            if(user){
                return user
            }
        } catch (error) {
            console.error
        }
    }

    async update(userData: {email:string,experience:string,qualification:string,certificate:{id:string,certificate_url:string},cv:{id:string,cv_url:string}}): Promise<Iuser | void> {
        try {
            const updatedUser = await this.userModels.findOneAndUpdate({email:userData.email},{$set:{status:"pending",qualification:userData.qualification,experience:userData.experience,cv:userData.cv,certificate:userData.certificate}})
            if(updatedUser){
                return updatedUser;
            }
        } catch (error) {
            console.error
        }
    }


}