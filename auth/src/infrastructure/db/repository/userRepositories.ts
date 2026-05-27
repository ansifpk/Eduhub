import { Iuser } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/user/repository/IuserRepository";
import { userModel } from "../models/userModel";
import { BaseRepository } from "./baseRepository";



export class UserRepository extends BaseRepository<Iuser> implements IUserRepository{
    constructor() {
       super(userModel);
    }

    async updatePassword(userId: string, password: string): Promise<Iuser | null> {
        return await super.updateById(userId,{password})
    }
    async findById(id: string): Promise<Iuser | null> {
      return await this.findById(id);
    }
    async update(_id:string,name:string,email:string): Promise<Iuser|null> {
      return  await this.updateById(_id,{name:name,email:email})
    }

    async create(newUser: Iuser): Promise<Iuser> {
         return  await this.create(newUser)
    }
    async findByEmail(email: string): Promise<Iuser | null> {
        return await this.findOne({email})
    }

    async changeEmail(userId: string, email: string): Promise<Iuser | null> {
          return await this.updateById(userId,{email:email});
     }
}