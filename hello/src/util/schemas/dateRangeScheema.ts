import { z } from "zod";

export const dateRangeScheema = z.object({
  start: z.string().min(1,{ message: "This Field is Required" }),
  end: z.string().min(1, { message: "This Field is Required" }),
});

export type DateFormInputs = z.infer<typeof dateRangeScheema>;
