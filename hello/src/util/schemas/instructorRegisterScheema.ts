import { z } from "zod";

export const registerInstructorSchema = z.object({
  email: z.string().min(1, { message: "This Field is Required" }).email({message:"Invalid email"}),
  experience: z.string({ message: "This Field is Required" }).min(1, { message: "This Field is Required" }),
  qualification: z.string().min(1, { message: "This Field is Required" }),
  certificate: z.object({
    id: z.string(),
    certificate_url: z.union([
      z
        .instanceof(File, { message: "This Field is Required" })
        .refine((file) => file.type.startsWith("image/"), {
          message: "File must be an image",
        }),
      z.string().min(1, { message: "This Field is Required" }),
    ]),
  }),
  cv: z.object({
    id: z.string(),
    cv_url: z.union([
      z
        .instanceof(File, { message: "This Field is Required" })
        .refine((file) => file.type.startsWith("image/"), {
          message: "File must be an image",
        }),
      z.string().min(1, { message: "This Field is Required" }),
    ]),
  }),
});

export type RegisterInstructorFormInputs = z.infer<typeof registerInstructorSchema>;
