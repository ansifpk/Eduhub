
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().min(1, { message: "This firld is Required" }).email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(12, { message: "Password must be max 12 characters"  }),
  name: z.string().trim().min(2, { message: "Invalid Name" }),
  mobile: z.string().trim().min(10, { message: "Mobile must be 10 Digits" }).max(10, { message: "Mobile must be 10 Digits" }),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
