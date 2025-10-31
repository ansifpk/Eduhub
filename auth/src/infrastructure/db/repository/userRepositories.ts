import { Iuser } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/IuserRepository";
import { userModel } from "../models/userModel";



export class UserRepository implements IUserRepository{
    constructor(
        private userModels:typeof userModel,
    ){}
   
    async updatePassword(userId: string, password: string): Promise<Iuser | void> {
        const user = await this.userModels.findByIdAndUpdate({_id:userId},{$set:{password:password}},{new:true})
       if(user){
        return user;
       }
    }
    async findById(id: string): Promise<Iuser | void> {
       const user = await this.userModels.findById({_id:id})
       if(user){
        return user;
       }
    }
    async update(_id:string,name:string,email:string): Promise<Iuser|void> {
      const user =  await this.userModels.findByIdAndUpdate({_id:_id},{$set:{name:name,email:email}},{new:true})
      if(user){
          return user;
      }
    }

    async create(newUser: Iuser): Promise<Iuser | void> {
         const user =  await this.userModels.create(newUser)
         await user.save();
         return user;
    }
    async findByEmail(email: string): Promise<Iuser | void> {
        let result = await this.userModels.findOne({email})
        if(result){
           return result;
        }
    }

    async changeEmail(userId: string, email: string): Promise<Iuser | void> {
        try {
           const user = await this.userModels.findByIdAndUpdate({_id:userId},{email:email},{new:true});
           if(user) return user;
        } catch (error) {
         console.error(error)
        }
     }
}