import mongoose from "mongoose";
import { ISection } from "../../../domain/entities/section";


const sectionScheema = new mongoose.Schema({
    sections:[
        {
         sectionTitle:{ type:String, require:true },
         lectures:[
            {
                title:{ type:String, require:true },
                duration:{ type:String, require:true },
                content:{
                    _id:{ type:String, require:true },
                    video_url:{ type:String, require:true },
                }
            }
         ]
        }
    ]
},{
        toJSON: {
          transform(doc,ret){
            delete ret.__v;
          }
        }
    })
const SectionModel = mongoose.model<ISection>('Section',sectionScheema)
export { SectionModel } ;