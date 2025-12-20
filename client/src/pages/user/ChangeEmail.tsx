import type { IUser } from "@/@types/userType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import {
  changeEmailSchema,
  type ChageEmailFormInputs,
} from "@/util/schemas/changeEmailScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { otpScheema, type OtpFormInputs } from "@/util/schemas/otpScheema";
import { Button } from "@/components/ui/button";
import { changeEmail } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ChangeEmail = () => {
  const [second, setSecond] = useState(59);
  const [minutes, setMinute] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [email,setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChageEmailFormInputs>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    handleSubmit: otpHandleSubmit,
    setValue,
    formState: { errors: otpErrors },
  } = useForm<OtpFormInputs>({
    resolver: zodResolver(otpScheema),
  });

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

  const handleEmail = async (data: ChageEmailFormInputs) => {
    setLoading(true);
    doRequest({
      url: `${userRoutes.changeEmailVeryfy}/${userId}`,
      body: { email: data.email },
      method: "post",
      onSuccess: () => {
        setLoading(false);
        setSecond(59);
        setMinute(1);
        setEmail(data.email)
        setOtpOpen(true);
      },
    });
  };
  const updateEmail = (data:OtpFormInputs) => {
      setLoading(true);
     
      doRequest({
        url:`${userRoutes.changeEmail}/${userId}`,
        body:{email:watch("email"),otp:data.otp},
        method:"patch",
        onSuccess:(response)=>{
          setOtpOpen(false);
          setLoading(false);
          dispatch(changeEmail(response.user.email))
          toast.success("Email chnaged successfully")
          return navigate("/user/profile");
        }
      })
  };

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
    setResendLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-1xl">
        <div className={"flex flex-col gap-6"}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-1">
              <form onSubmit={handleSubmit(handleEmail)} className="p-6 md:p-8">
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-teal-400">EduHub</h1>
                    <p className="text-muted-foreground text-balance">
                      Enter your new email ANd we will sent you an OTP to verify
                      this email
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <label
                      htmlFor="email"
                      className={errors.email && "text-red-500"}
                    >
                      {errors.email ? errors.email.message : "Email"}
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      type="text"
                      placeholder="please enter your email"
                      autoComplete="email"
                      className="border py-1 rounded-full px-2 border-teal-300"
                    />
                  </div>
                  
                </div>
              </form>
              <div className="flex gap-2 p-2">
                  <button type="button" onClick={()=>navigate(-1)} className={`w-full bg-teal-400 flex items-center justify-center-safe hover:bg-teal-400 rounded p-2 text-white font-semibold cursor-pointer`} >
                    cancell
                  </button>
                    <button
                    type="submit"
                    onClick={()=>handleSubmit(handleEmail)()}
                    className={`w-full bg-teal-400 flex items-center justify-center-safe hover:bg-teal-400 rounded p-2 text-white font-semibold cursor-pointer`}
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <><span>Loading...</span><Loader2 className="ml-3 h-5 w-5 animate-spin" /></>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                  </div>
            </CardContent>
          </Card>

          <Dialog open={otpOpen} onOpenChange={()=>{
            if(otpOpen){
               setValue("otp","");
            }
            setOtpOpen(!otpOpen);
          }}>
            <form>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                   
                  </DialogDescription>
                </DialogHeader>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-teal-500">
                      Verify Your Email
                    </CardTitle>
                    <CardDescription>
                      Enter your OTP that sent to your Email address.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={otpHandleSubmit(updateEmail)}>
                      <div className="grid gap-6">
                        <div className="grid gap-6">
                          <div className="grid gap-3 items-center text-center justify-center">
                            <label htmlFor="email">OTP</label>
                            {otpErrors.otp && (
                              <p className="text-red-500">
                                {otpErrors.otp.message}
                              </p>
                            )}
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
                            <div>
                              <p>
                                Time Remaining:{" "}
                                <span
                                  style={{ color: "black", fontWeight: 600 }}
                                >
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
                                  `Resend OTP ${resendLoading}`
                                )}
                              </Button>
                            )}
                            <Button
                              type="submit"
                              disabled={
                                loading || (minutes == 0 && second == 0)
                              }
                              className="w-full bg-teal-500 cursor-pointer hover:bg-teal-300 text-white"
                            >
                              {loading ? (
                                <>
                                  Loading...
                                  <i className="bi bi-arrow-repeat animate-spin"></i>
                                </>
                              ) : (
                                `Verify`
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
          
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChangeEmail);
