import { Iuser } from "../../../../entities/user";
import { IAdminRepository } from "../../../../useCases/interfaces/repositoryInterfaces/IadminRepository";
import { userModel } from "../models/userModel";

export class AdminRepository implements IAdminRepository{
   
    constructor(private userModels:typeof userModel){}
    async find(): Promise<Iuser[] | void> {
        try {
            const students = await this.userModels.find({isAdmin:false}).sort({createdAt:-1})
            if(students){
              return students;
            }
        } catch (error) {
            console.error(error)
        }
    }

    async findByEmail(email: string): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findOne({email:email})
        if(user){
            return user
        }
       } catch (error) {
        console.error(error)
       }

    }
    async approveIntructor(email: string, status: string,instructor:boolean): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findOneAndUpdate({email:email},{$set:{status:status,isInstructor:instructor}},{new:true})
        if(user){
            console.log(user.isInstructor,user.status);
            
           return user;
        }
       } catch (error) {
        console.error(error)
       }
    }

    async findInstructors(): Promise<Iuser[] | void> {
        try {
             const users = await this.userModels.find({isAdmin:false,$or:[{status:'pending'},{status:"Approved"}]}).sort({createdAt:-1})
             if(users){
                return users;
             }
        } catch (error) {
            console.error(error)
        }
    }

}