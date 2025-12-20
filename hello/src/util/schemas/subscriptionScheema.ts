// schemas/loginSchema.ts
import { z } from "zod";

export const subscriptionSchema = z.object({
  price: z.string().min(1,{ message: "This Field is Required" }),
  method:z.array(z.string().min(1,{ message: "This Field is Required" })).min(1,{message:"This Field is Required"}),
});

export type SubscriptionFormInputs = z.infer<typeof subscriptionSchema>;
