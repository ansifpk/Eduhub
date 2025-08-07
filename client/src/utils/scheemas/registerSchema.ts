
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().trim().min(2, { message: "Invalid Name" }),
  mobile: z.number().min(10, { message: "Mobile must be 10 Digits" }).max(10, { message: "Mobile must be 10 Digits" }),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
