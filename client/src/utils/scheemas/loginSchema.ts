// schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "This Field is Required" }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
