import { z } from "zod";

export const couponSchema = z.object({
  title: z.string().min(1, { message: "This Field is Required" }),
  description: z.string().min(1, { message: "This Field is Required" }),
  offer: z.string().min(1, { message: "This Field is Required" }),
  expiryDate: z.string().min(1, { message: "This Field is Required" }),
  startingDate: z.string().min(1, { message: "This Field is Required" }),
  couponCode: z.string().min(1, { message: "This Field is Required" }),
});

export type CouponFormInputs = z.infer<typeof couponSchema>;
