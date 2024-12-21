import mongoose from "mongoose";
import { ICart } from "../../../../entities/cart";

const cartScheema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            require:true
        }
    ]
})

const cartModel = mongoose.model<ICart>('Cart',cartScheema)
export {cartModel}