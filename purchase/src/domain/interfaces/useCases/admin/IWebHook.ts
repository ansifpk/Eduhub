import Stripe from "stripe";

export interface IWebHook{
    execute(input: {
    event: Stripe.Event;
  }): Promise<void>
}