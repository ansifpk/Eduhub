import { Iuser } from "../../../../entities/user";
import { IInstructorRepository } from "../../../../useCase/interface/repositoryInterface/IInstructorInterface";
import { IInstructor } from "../../../../useCase/interface/useCsesInterface/IinstructorInterface";
import { userModel } from "../models/userModel";


export class InstructorRepository implements IInstructorRepository{

    constructor(
        private userModels:typeof userModel,
    ){}
    async create(instructorData: IInstructor): Promise<Iuser | void> {
       try {
        const user = await this.userModels.create(instructorData);
       user.isInstructor=true;
       await user.save();
       return user
       } catch (error) {
        
       }
       
    }
    async makeInstructor(email: string): Promise<Iuser | void> {
      try {
        const user = await this.userModels.findOneAndUpdate({email},{$set:{isInstructor:true}},{new:true});
        if(user){
            return user
        }
      } catch (error) {
        console.error(error)
      }
       
    }
    async find(): Promise<Iuser[] | void> {
       try {
        const studnets =  await this.userModels.find({isAdmin:false});
       return studnets
       } catch (error) {
        console.error(error)
       }
    }
    async findById(id: string): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findById({_id:id});
        if(user){
            return user
        }
       } catch (error) {
        console.error(error)
       }
    }

    async findByEmail(email: string): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findOne({email});
        if(user){
            return user
        }
       } catch (error) {
        console.error(error)
       }
    }
    async asyncfinById(id: string): Promise<Iuser | void> {
        try {
            const user = await this.userModels.findById({_id:id});
        if(user){
            return user
        }
        } catch (error) {
            console.error(error)
        }
    }
    async update(id: string, email: string, name: string): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findByIdAndUpdate({_id:id},{$set:{name:name,email:email}},{new:true});
        if(user){
            return user
        }
       } catch (error) {
        console.error(error)
       }
    }
    
}