
import { z } from "zod";

export const profileSchema = z.object({
  
  name: z.string().min(1, { message: "This Field is Required" }),
  aboutMe: z.string().min(1, { message: "This Field is Required" }),
  thumbnail: z.string().min(1, { message: "This Field is Required" }),
});

export type ProfileFormInputs = z.infer<typeof profileSchema>;
