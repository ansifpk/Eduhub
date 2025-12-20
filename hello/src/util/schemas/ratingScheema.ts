
import { z } from "zod";

export const ratingScheema = z.object({
  rating: z.string().min(1, { message: "This Field is Required" }),
  star: z.number().min(1, { message: "This Field is Required" }),
});

export type RatingFormInputs = z.infer<typeof ratingScheema>;
