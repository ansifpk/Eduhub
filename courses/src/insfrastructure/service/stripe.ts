import Strip from 'stripe';
import { IStripe } from '../../domain/interfaces/service/stripe';

export class Stripe implements IStripe{
    private stripe:Strip
    constructor(){
        this.stripe= new Strip(process.env.STRIPE_SECRET!,{apiVersion:"2024-11-20.acacia"})
    }
    async createStripe(lineItems:object[],metadata:{ [key: string]: string }):Promise<string|void>{

        const customer = await this.stripe.customers.create({
                name: "ansif",
                address: {
                    line1: "123 Street Name",
                    city: "City Name",
                    country: "AE",
                    postal_code: "12345",
                },
        });
 
       const session =  await this.stripe.checkout.sessions.create({
          
          payment_method_types:["card"],
          line_items:lineItems,
          mode:"payment",
          customer:customer.id,
          metadata:metadata,
          success_url: process.env.success_url,
          cancel_url: process.env.cancel_url
        });
        if(session){
            return session.id
        }
    }
}