import { z } from "zod";

export const FormSchema = z.object({
    name: z.string().trim().min(2, {
        message: "name must be in between 2-20 characters.",
    }).max(20,{
        message: "name must be in between 2-20 characters.",
    }),
    email: z.string().trim().min(1,{
      message: "This field is required.",
    }),
    password: z.string().trim().min(8,{
      message: "Enter a strong password.",
    }).max(20,{
        message: "Password is too strong.",
    }),
    // confirmPassword: z.string().trim(),
  })
//   .refine((data)=>data.password == data.confirmPassword,{
//     message:"password and confirm password is not matching",
//     path: ["confirmPassword"],
//   })