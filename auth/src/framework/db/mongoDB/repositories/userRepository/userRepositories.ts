import { Iuser } from "../../../../../entities/user";
import { IUserRepository } from "../../../../../useCase/interface/repositoryInterface/IuserRepository";
import { userModel } from "../../models/userModel";


export class UserRepository implements IUserRepository{
    constructor(
        private userModels:typeof userModel,
    ){}
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
    async signUp(email: string): Promise<string> {
        
        return "return a tocken";
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
}