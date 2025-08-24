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
import userRoutes from "@/service/endPoints/userEndPoints";
import { Button } from "@/components/ui/button";

interface Props {
  email: string;
  handlePage: (page: number) => void;
}

const verifyOtp: React.FC<Props> = ({ email, handlePage }) => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  // const [otp, setOtp] = useState("");
  const [second, setSecond] = useState(59);
  const [minutes, setMinute] = useState(1);
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
      url: userRoutes.verifyPassOtp,
      body: { email: email, otp: data.otp },
      method: "post",
      onSuccess: () => {
        handlePage(3);
        toast.success("Email verified successfully");
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    const intervel = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
      if (second === 0) {
        if (minutes === 0) {
          clearInterval(intervel);
        } else {
          setSecond(59);
          setMinute(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervel);
    };
  }, [second]);

    const resentOTP = async () => {
      setResendLoading(true)
       await doRequest({
        url:userRoutes.resentOtp,
        method:"post",
        body:{email:email},
        onSuccess:()=>{
          setResendLoading(false)
          setSecond(59);
          setMinute(1);
          toast.success("Resnt OTP Sent to Your Mail")
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
                        onChange={(value) => setValue("otp", value)}
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
                      <div>
                        <p>
                          Time Remaining:{" "}
                          <span style={{ color: "black", fontWeight: 600 }}>
                            {minutes! < 10 ? `0${minutes}` : minutes}:
                            {second! < 10 ? `0${second}` : second}
                          </span>
                        </p>
                      </div>
                      {minutes == 0 && second == 0 && (
                        <Button
                          type="button"
                          disabled={resendLoading}
                          onClick={resentOTP}
                          className="w-full bg-red-500 cursor-pointer hover:bg-red-300 text-white"
                        >
                          {resendLoading ? (
                            <>
                              Loading...
                              <i className="bi bi-arrow-repeat animate-spin"></i>
                            </>
                          ) : (
                            "Resend OTP"
                          )}
                        </Button>
                      )}
                     <Button
                        type="submit"
                        disabled={loading || (minutes == 0 && second == 0)}
                        className={`w-full bg-teal-500 hover:bg-teal-300 text-white ${loading || (minutes == 0 && second == 0) ?"" : "cursor-pointer"}`}
                      >
                        {loading ? (
                          <>
                            Verifying...
                            <i className="bi bi-arrow-repeat animate-spin"></i>
                          </>
                        ) : (
                          "Verify"
                        )}
                      </Button>
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
