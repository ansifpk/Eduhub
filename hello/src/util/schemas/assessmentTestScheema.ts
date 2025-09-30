


// schemas/loginSchema.ts
import { z } from "zod";

export const assessmentTestSchema = z.object({
  questions:z.array(z.object({
    question: z.string().trim().min(1, { message: "You need to answer this question" }),
    option1: z.string().trim().min(1, { message: "You need to answer this question" }),
    option2: z.string().trim().min(1, { message: "You need to answer this question" }),
    option3: z.string().trim().min(1, { message: "You need to answer this question" }),
    option4: z.string().trim().min(1, { message: "You need to answer this question" }),
    answer: z.string().trim().min(1, { message: "You need to answer this question" }),
    selected: z.string().trim().min(1, { message: "You need to answer this question" }),
  }))
});

export type AssessmentTestForm = z.infer<typeof assessmentTestSchema>;
