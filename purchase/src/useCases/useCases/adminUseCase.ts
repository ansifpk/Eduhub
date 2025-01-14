import { NextFunction } from "express";
import { ISubcription } from "../../entities/subscription";
import exceljs from 'exceljs'
import { IAdminRepository } from "../interfaces/repository/IAdminrepository";
import { IAdminUseCase } from "../interfaces/useCases/IAdminUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import Stripe from 'stripe';
import { IOrder } from "../../entities/order";
import { Iuser } from "../../entities/user";

const stripe = new Stripe(process.env.STRIPE_SECRET!, { apiVersion: '2024-12-18.acacia' });

export class AdminUseCase implements IAdminUseCase{
    constructor(
        private adminRepository:IAdminRepository
    ){}
 
   async getOrders(report:string,year:string,month:string,next:NextFunction): Promise<IOrder[]|void> {
     try {
      
      
      const orders =  await this.adminRepository.findOrders()
      if(report == "Monthly"){
        const months = [
          "01",
          "02",
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
        ]
        const index = months[parseInt(month)]
        const starting =`${year}-${index}-01` ;
        const ending = `${year}-${index}-30`;
        if(orders){
          const find = orders?.filter((value)=>value.createdAt >= new Date(starting)&&value.createdAt <= new Date(ending))
          return find;
        }
      }else{
            const start =`${year}-01-01` ;
            const end = `${year}-12-30`;
           if(orders){
             const find = orders?.filter((value)=>value.createdAt >= new Date(start)&&value.createdAt <= new Date(end))
             return find;
           }
      }
     } catch (error) {
      console.error(error)
     }
    }

    async editSubscription(subscriptionId: string, price:number, next: NextFunction): Promise<ISubcription | void> {
       try {
         const check = await this.adminRepository.findSubscriptionById(subscriptionId);
         if(!check){
            return next(new ErrorHandler(400,"Subscription Not Found."));
         } 
         const sub = await stripe.subscriptions.list({})
         
        let subscription = sub.data.filter((value)=>{
           return value.items.data.find((val)=>val.price.product == check.productId)
        })
  
        const subItemId = await stripe.subscriptions.retrieve(subscription[0].id);
 
          const productPrices = await stripe.prices.list({ product: check.productId });
            if(productPrices){
             for (let price of productPrices.data) {
                if (price.active) {
                  await stripe.prices.update(price.id, { active: false });
                }
              }
              const stripePrice = await stripe.prices.create({
                unit_amount: price * 100,
                currency: 'inr', 
                recurring: { interval: 'month' },
                product: check.productId,
            });
            const updatedSubscription = await stripe.subscriptions.update(subscription[0].id, {
                items: [{
                  id: subItemId.items.data[0].id, 
                  price: stripePrice.id, 
                }],
                metadata:{
                    edited:"admin"
                }
              });
              const edit = await this.adminRepository.subscriptionEditById(subscriptionId,price,stripePrice.id);
              if(edit){
                return edit;
              }
         }

       } catch (error) {
        console.error(error)
       }
    }

    async deleteSubscription(subscriptionId: string, next: NextFunction): Promise<ISubcription | void> {
       try {
         const check = await this.adminRepository.findSubscriptionById(subscriptionId);
         if(!check){
            return next(new ErrorHandler(400,"Subscription Not Found."));
         } 
          
    //      const deleted = await this.adminRepository.subscriptionDeleteById(subscriptionId);
    //      if(deleted){
            // console.log("subId",subscriptionId,check.subscription);
            
    //         await stripe.subscriptions.cancel(subscriptionId);
    //         return deleted;
    //      }

       } catch (error) {
        console.error(error)
       }
    }

    async getSubscriptions(): Promise<ISubcription[] | void> {
        try {
           const subscriptions = await this.adminRepository.findSubscriptions()
           if(subscriptions){
            return subscriptions;
           }
        } catch (error) {
            console.error(error)
        }
    }

    async createSubscription(price:number,plan:string,description:string[],next:NextFunction): Promise<ISubcription | void> {
        try {
            const check = await this.adminRepository.findSubscription(plan)
            if(check){
                return next(new ErrorHandler(400,"This plan alredy exists."));
            }
            const subscription = await this.adminRepository.createSubscription(price,plan,description);
            if(subscription){
                const product = await stripe.products.create({
                    name: plan,
                    description: description.join(','),
                });
                const stripePrice = await stripe.prices.create({
                    unit_amount: price * 100,
                    currency: 'inr', 
                    recurring: { interval: 'month' },
                    product: product.id,
                });
             
                
                await this.adminRepository.setProductId(subscription._id,product.id,stripePrice.id)
                
                return subscription;
            }
        } catch (error) {
            console.error(error)
        }
    }

    async createReport(report: string, year: string, month: string, next: NextFunction): Promise<exceljs.Workbook| void> {
      try {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Orders")
        worksheet.columns = [
          { header: "S no.", key: 's_no' , width: 20},
          { header: "User Name", key: 'userName' , width: 20},
          { header: "Course Name", key: 'courseName' , width: 20},
          { header: "Course Price", key: 'coursePrice' , width: 20},
          { header: "Order Date", key: 'orderDate' , width: 20},
          { header: "Total", key: 'total', width: 20 },
      ];
      const months = [
        "01",
        "02",
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ]
      const orders =  await this.adminRepository.findOrders();
      let  starting = '' 
      let ending = ''
        if(report == "Monthly"){
            const index = months[parseInt(month)]
            starting =`${year}-${index}-01` ;
            ending = `${year}-${index}-30`;
        }else{
          starting =`${year}-01-01` ;
          ending = `${year}-12-30`;
        }

        if(orders){
          let datas = {
            s_no:0,
            userName:'',
            courseName:'',
            coursePrice:0,
            orderDate:new Date(),
            total:0
          }
          
          orders.map((order,index)=>{
            if(order.createdAt >= new Date(starting)&&order.createdAt <= new Date(ending) ){
              datas.s_no = index+1
              datas.userName = order.user.name
              datas.courseName = order.course.title
              datas.coursePrice = order.course.price
              datas.orderDate = order.createdAt
              datas.total = order.course.price
              worksheet.addRow(datas);
            }
          })
          worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
          });
            return workbook    
         }
          
      } catch (error) {
        console.error(error)
      }
    }

   
    
}