import { NextFunction, Request, Response } from "express";
import { IInstructorUseCase } from "../useCases/interfaces/useCases/IInstrctorUseCase";

export class InstructorController{
    constructor(
        private instructorUseCase:IInstructorUseCase
    ){}
    
    async editSubscription(req:Request,res:Response,next:NextFunction){
        const {subscriptionId} = req.params;
        const {price} = req.body;
        const subscription = await this.instructorUseCase.editSubscription(subscriptionId,price,next)
        if(subscription){
            return res.send({success:true})
        }
    }
    
    async instructorSubscriptions(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params
        const subscriptions = await this.instructorUseCase.instructorSubscriptions(userId,next)
        if(subscriptions){
            return res.send({success:true,subscriptions})
        }
    }

    async getPlans(req:Request,res:Response,next:NextFunction){
       
        const {userId} = req.params
        
        const plans = await this.instructorUseCase.getPlans(userId,next)
        if(plans){
            return res.send({success:true,plans})
        }
    }

  
    async getSubscriptions(req:Request,res:Response,next:NextFunction){
        try {
            const subscriptions =  await this.instructorUseCase.getSubscriptions(next)
        if(subscriptions){
            return res.send({success:true,subscriptions:subscriptions})
        }
        } catch (error) {
            console.error(error)
        }
    }
    async purchaseSubscription(req:Request,res:Response,next:NextFunction){
        try {
        const {method,userId} = req.params;
        const sessionId =  await this.instructorUseCase.purchaseSubscription(userId,method,next)
        if (sessionId) {
            res.send({success:true, sessionId });
          }
        } catch (error) {
            console.error(error)
        }
    }
    async subscriptionDetailes(req:Request,res:Response,next:NextFunction){
        try {
        const {customerId} = req.params;
        const sessionId =  await this.instructorUseCase.subscriptionDetailes(customerId,next)
        if (sessionId) {
            res.send({success:true, url:sessionId });
          }
        } catch (error) {
            console.error(error)
        }
    }

    async createSubscription(req:Request,res:Response,next:NextFunction){
        try {
        const {userId} = req.params;
        const {plan,price,description} = req.body
     
        const subscription =  await this.instructorUseCase.createSubscription(userId,plan,price,description,next)
        if (subscription) {
            res.send({success:true});
          }
        } catch (error) {
            console.error(error)
        }
    }
    
    async getOrders(req:Request,res:Response,next:NextFunction){
        try {
         const {instructorId,start,end}  = req.query ;
        
          const orders = await this.instructorUseCase.getOrders(instructorId as string,start as string,end as string,next)
          if(orders){
              return res.send({success:true,orders});
          }
        } catch (error) {
         console.error(error)
        }
     }

    async salesReports(req:Request,res:Response,next:NextFunction){
        try {
           const {userId,report,year,month}  = req.query 
      
           const workbook = await this.instructorUseCase.createReport(userId as string,report as string,year as string,month as string,next)
         if(workbook){
            workbook.xlsx.writeBuffer().then((data) => {
             res.status(200).send(data);
             })
           }
         
        } catch (error) {
         console.error(error)
        }
     }

    async instructorOrders(req:Request,res:Response,next:NextFunction){
        try {
           const {instructorId,filter}  = req.params 
           const orders = await this.instructorUseCase.instructorOrders(instructorId,filter,next)
           if(orders){
           
             res.send({success:true,orders:orders});
           }
         
        } catch (error) {
         console.error(error)
        }
     }
   
}