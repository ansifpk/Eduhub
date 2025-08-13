
import { z } from "zod";

export const changeEmailSchema = z.object({
  email: z.string().min(1,{ message: "This Field is Required" }).email({message:"invalid email"}),
});

export type ChageEmailFormInputs = z.infer<typeof changeEmailSchema>;
