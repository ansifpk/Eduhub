import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, { message: "This Field is Required" }),
  category: z.string().min(1, { message: "This Field is Required" }),
  subCategory: z.string().min(1, { message: "This Field is Required" }),
  level: z.string().min(1, { message: "This Field is Required" }),
  thumbnail: z.string().min(1, { message: "This Field is Required" }),
  description: z.string().min(1, { message: "This Field is Required" }),
  price: z.string().min(1, { message: "This Field is Required" }),
  courseImage: z
    .instanceof(File, { message: "This Field is Required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    }),
  sections: z.array(
    z.object({
      sectionTitle: z.string().min(1, { message: "This Field is Required" }),
      lectures: z.array(
        z.object({
          title: z
            .string()
            .min(1, { message: "This Field is Required" }),
          duration: z.string().min(1, { message: "This Field is Required" }),
          content: z.union([
            z.instanceof(File,{message:"This Field is Required"})
            .refine((file) => file.type.startsWith("video/"), {
              message: "File must be an image",
            }),
            z.string().min(1,{message:"This Field is Required"})
          ])
            ,
        })
      ),
    })
  ),
});

export type CourseFormInputs = z.infer<typeof courseSchema>;
