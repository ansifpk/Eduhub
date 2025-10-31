import { IAdmin } from "../../../domain/entities/admin";
import { Iuser } from "../../../domain/entities/user";
import { IAdminRepository } from "../../../domain/interfaces/IAdminRepository";
import { userModel } from "../models/userModel";


export class AdminRepository implements IAdminRepository{
    constructor(
       private userModels:typeof userModel,
    ){}
    async create(userData: Iuser): Promise<Iuser | void> {

       const user = await this.userModels.create(userData);
       user.save();
       return user;
       
    }
    async update(adminId: string, name: string, email: string): Promise<Iuser | void> {
       const user = await this.userModels.findByIdAndUpdate({_id:adminId},{$set:{name:name,email:email}},{new:true});
       if(user){
        return user
       }
    }
    async block(student: Iuser): Promise<Iuser | void> {
        const newStudnet =  await this.userModels.findByIdAndUpdate({_id:student._id},{$set:{isBlock:!student.isBlock}},{new :true})
        if(newStudnet){
            return newStudnet
        }
    }
    async find(): Promise<Iuser[]|void> {
        const admin = await this.userModels.find({isAdmin:false}).sort({createdAt:-1})
        if(admin){
            return admin;
        }
    }
    async findById(userId: string): Promise<Iuser|void> {
        const admin = await this.userModels.findById({_id:userId})
        if(admin){
            return admin;
        }
    }
    async findByEmail(email: string): Promise<IAdmin|void> {
        const admin = await this.userModels.findOne({email})
        if(admin){
            return admin;
        }
    }
    
}