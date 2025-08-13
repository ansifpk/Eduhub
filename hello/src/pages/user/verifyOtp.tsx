import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useRequest from "@/hooks/useRequest";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { otpScheema, type OtpFormInputs } from "@/util/schemas/otpScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import userRoutes from "@/service/endPoints/userEndPoints";


interface Props {
  email: string;
  handlePage: (page: number) => void;
}


const verifyOtp:React.FC<Props>  = ({email,handlePage}) => {
  const [loading, setLoading] = useState(false);
  const { doRequest, err } = useRequest();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormInputs>({
    resolver: zodResolver(otpScheema),
  });


  const onSubmit = async (data: OtpFormInputs) => {
    setLoading(true);
    doRequest({
        url:userRoutes.verifyPassOtp,
        body:{email:email,otp:data.otp},
        method:"post",
        onSuccess:()=>{
          handlePage(3);
          toast.success("Email verified successfully");
          setLoading(false);
        }
      })
  };

  useEffect(() => {
    setLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-teal-500">
                Enter Your OTP
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3 items-center text-center justify-center">
                      <label htmlFor="email">OTP</label>
                      <InputOTP
                        onChange={(value)=>setValue("otp",value)}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="border border-teal-400 rounded"
                            index={0}
                          />
                          <InputOTPSlot
                            className="border border-teal-400 rounded"
                            index={1}
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="border border-teal-400 rounded"
                            index={2}
                          />
                          <InputOTPSlot
                            className="border border-teal-400 rounded"
                            index={3}
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="border border-teal-400 rounded"
                            index={4}
                          />
                          <InputOTPSlot
                            className="border border-teal-400 rounded"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                      {errors.otp && (
                        <p className="text-red-500">{errors.otp.message}</p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-500 hover:bg-teal-300 font-semibold rounded p-2 cursor-pointer text-white"
                      >
                        {loading ? (
                          <div className="flex items-center-safe justify-center-safe">
                            <span className="text-white">Loading...</span>
                            <Loader2Icon className="animate-spin" />
                          </div>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default React.memo(verifyOtp);
