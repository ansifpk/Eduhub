import mongoose, { Model, Schema } from "mongoose";
import { Iotp } from "../../../domain/entities/otp";


const OtpSchema: Schema<Iotp> = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createAt: {
        type: Date,
        default: new Date(),
    }
},{
    toJSON:{
       transform(doc,ret){
          delete ret.__v;
        }
    }
 })
OtpSchema.index({ createAt: 1 }, { expireAfterSeconds: 120  });
const otpModel: Model<Iotp> = mongoose.model('otp', OtpSchema);
export default otpModel;