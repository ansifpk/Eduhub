import { Iuser } from "../../../domain/entities/user";
import { IAdminRepository } from "../../../domain/interfaces/admin/repositories/IAdminRepository";
import { userModel } from "../models/userModel";
import { BaseRepository } from "./baseRepository";


export class AdminRepository extends BaseRepository<Iuser> implements IAdminRepository{
     constructor() {
       super(userModel);
    }
    async create(userData: Iuser): Promise<Iuser> {

       return await super.create(userData);
       
    }
    async update(adminId: string, name: string, email: string): Promise<Iuser | null> {
       return await super.updateById(adminId,{name:name,email:email});
    
    }
    async block(student: Iuser): Promise<Iuser | null> {
        return  await super.updateById(student._id!,{isBlock:!student.isBlock})
     
    }
    async find(): Promise<Iuser[]|null> {
        return await super.find({isAdmin:false},{createdAt:-1})
    }
    async findById(userId: string): Promise<Iuser|null> {
        return await super.findById(userId)
      
    }
    async findByEmail(email: string): Promise<Iuser|null> {
        return await super.findOne({email})
    }
    
}