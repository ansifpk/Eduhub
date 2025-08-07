// schemas/loginSchema.ts
import { z } from "zod";

export const testSchema = z.object({
  questions:z.array(z.object({
    question: z.string().trim().min(1, { message: "This field is required" }),
    option1: z.string().trim().min(1, { message: "This field is required" }),
    option2: z.string().trim().min(1, { message: "This field is required" }),
    option3: z.string().trim().min(1, { message: "This field is required" }),
    option4: z.string().trim().min(1, { message: "This field is required" }),
    answer: z.string().trim().min(1, { message: "This field is required" }),
  })).length(5,{message:"Exactly 5 questions are required"})
});

export type TestFormInputs = z.infer<typeof testSchema>;
