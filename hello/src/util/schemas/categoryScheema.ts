
import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(1,{ message: "This Field is Required" }),
  description: z.string().min(1, { message: "This Field is Required" }),
  topics:z.array(z.string()).min(1,{message:"Add atleast one topic"}).max(8,{message:"Maximum topic exeeded."})
});

export type CategoryFormInputs = z.infer<typeof categorySchema>;
