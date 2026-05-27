
import { Iuser } from "../../../domain/entities/user";
import { IInstructor } from "../../../domain/interfaces/IInstructorInterface";
import { IInstructorRepository } from "../../../domain/interfaces/instructor/repositories/IInstructorRepository";
import { userModel } from "../models/userModel";
import { BaseRepository } from "./baseRepository";


export class InstructorRepository extends BaseRepository<Iuser> implements IInstructorRepository{

    constructor(){
        super(userModel)
    }
    async create(instructorData: IInstructor): Promise<Iuser> {
       const user = await this.model.userModels.create(instructorData);
       user.isInstructor=true;
       await user.save();
       return user;
    }
    async makeInstructor(email: string): Promise<Iuser | null> {
        return await this.model.findOneAndUpdate({email},{$set:{isInstructor:true}},{new:true});
    }
    async find(): Promise<Iuser[] | null> {
        return super.find({isAdmin:false},{createdAt:-1})
    }
    async findById(id: string): Promise<Iuser | null> {
        return super.findById(id)
    }

    async findByEmail(email: string): Promise<Iuser | null> {
        return super.findOne({email})
    }
   
    async update(id: string, email: string, name: string): Promise<Iuser | null> {
        return super.updateById(id,{name:name,email:email});
    }
    
}