import mongoose from "mongoose";
import { ISection } from "../../../../entities/section";


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
    },{
        toJSON: {
          transform(doc,ret){
            delete ret.__v;
          }
        }
    });
const SectionModel = mongoose.model<ISection>('Section',sectionScheema)
export { SectionModel } ;