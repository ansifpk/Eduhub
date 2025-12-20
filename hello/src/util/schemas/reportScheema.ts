
import { z } from "zod";

export const reportScheema = z.object({
  report: z.string().min(1, { message: "This Field is Required" })
});

export type reportScheemaFormInputs = z.infer<typeof reportScheema>;
