import Strip from 'stripe';
import { IStripe } from '../../useCases/interfaces/service/stripe';
interface Course{
    _id:string,
    title:string,
    instructorId?:string,
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test?:[];
    subscription:boolean,
    videos:string[],
    image:string,
    imageUrl:string,
    videoUrl:string[],
    createdAt:string,
 }

export class Stripe implements IStripe{
    private stripe:Strip
    constructor(){
        this.stripe= new Strip(process.env.STRIPE_SECRET!,{apiVersion:"2024-11-20.acacia"})
    }
    async createStripe(courseData:Course){
 
       const session =  await this.stripe.checkout.sessions.create({
          payment_method_types:["card"],
          line_items:[
              {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:courseData.title,
                        images:[courseData.imageUrl]
                    },
                    unit_amount:courseData.price*100
                },
                quantity:1
              }
          ],
          mode:"payment",
          success_url:"http://localhost:3002/user/success",
          cancel_url:"http://localhost:3002/user/faile"
        })
    }
}