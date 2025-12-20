
import { z } from "zod";

export const newPasswordScheema = z.object({
  newPassword: z.string().min(1, { message: "This Field is Required" }).min(6,{ message: "Password should be in between 6 and 20" }).max(20,{message: "Password should be in between 6 and 20"}),
  confirmPassword: z.string().min(1, { message: "This Field is Required" }),
});

export type NewPasswordFormInputs = z.infer<typeof newPasswordScheema>;
