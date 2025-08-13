import { z } from "zod";

export const registerInstructorSchema = z.object({
  email: z.string().min(1, { message: "This Field is Required" }).email({message:"Invalid email"}),
  category: z.string().min(1, { message: "This Field is Required" }),
  subCategory: z.string().min(1, { message: "This Field is Required" }),
  level: z.string().min(1, { message: "This Field is Required" }),
  thumbnail: z.string().min(1, { message: "This Field is Required" }),
  description: z.string().min(1, { message: "This Field is Required" }),
  price: z.string().min(1, { message: "This Field is Required" }),
  image: z.object({
    _id: z.string(),
    image_url: z.union([
      z
        .instanceof(File, { message: "This Field is Required" })
        .refine((file) => file.type.startsWith("image/"), {
          message: "File must be an image",
        }),
      z.string().min(1, { message: "This Field is Required" }),
    ]),
  }),
  sections: z.object({
    sections: z.array(
      z.object({
        sectionTitle: z.string().min(1, { message: "This Field is Required" }),
        lectures: z.array(
          z.object({
            title: z.string().min(1, { message: "This Field is Required" }),
            duration: z.string().min(1, { message: "This Field is Required" }),
            content: z.object({
              _id: z.string(),
              video_url: z.union([
                z
                  .instanceof(File, { message: "This Field is Required" })
                  .refine((file) => file.type.startsWith("video/"), {
                    message: "File must be an video",
                  }),
                z.string().min(1, { message: "This Field is Required" }),
              ]),
            }),
          })
        )
      })
    ).min(1,{message:"Atleae one section is required"}),
  }),
});

export type RegisterInstructorFormInputs = z.infer<typeof registerInstructorSchema>;
