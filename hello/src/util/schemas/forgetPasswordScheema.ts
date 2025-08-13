
import { z } from "zod";

export const forgetPasswordScheema = z.object({
  email: z.string().min(1, { message: "This Field is Required" }).email({ message: "Invalid email address" }),
});

export type ForgetPasswordFormInputs = z.infer<typeof forgetPasswordScheema>;
