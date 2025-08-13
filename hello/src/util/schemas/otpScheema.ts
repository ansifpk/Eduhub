
import { z } from "zod";

export const otpScheema = z.object({
  otp: z.string().min(6, { message: "This Field is Required" })
});

export type OtpFormInputs = z.infer<typeof otpScheema>;
