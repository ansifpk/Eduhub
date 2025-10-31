import mongoose from "mongoose";
import { ISection } from "../../../domain/entities/section";


const sectionScheema = new mongoose.Schema({
        sectionTitle:{
            type:String,
            require:true
        },
        lectures:[{
            id:{
                type:String,
                required:true
            },
            title:{
                type:String,
                require:true
            },
             duration:{
                type:String,
                required:true
            },
            content:{
                _id:{
                    type:String,
                    required:true
                },
                video_url:{
                    type:String,
                    required:true
                },
            }
        }]
});
const SectionModel = mongoose.model<ISection>('Section',sectionScheema)
export { SectionModel } ;