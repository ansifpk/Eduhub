import mongoose, { Model, Schema } from "mongoose";
import { Iotp } from "../../../domain/entities/otp";


const OtpSchema: Schema<Iotp> = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
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