import { NextFunction } from "express";
import Stripe from "stripe";

export interface IWebhookUseCase{
    webHook(event:Stripe.Event,next:NextFunction):Promise<void>
}