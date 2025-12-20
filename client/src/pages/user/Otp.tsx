import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import useRequest from "@/hooks/useRequest";
import { setUser } from "@/redux/authSlice";
import userRoutes from "@/service/endPoints/userEndPoints";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Otp = () => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [second, setSecond] = useState(59);
  const [minutes, setMinute] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {email} = useParams()
  const { doRequest, err } = useRequest();

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
    setLoading(false)
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.length < 6) {
      setLoading(false);
      return toast.error("Please Enter All 6 Disgits of The Otp");
    }

    setLoading(true);

    await doRequest({
      url: userRoutes.verifyOtp,
      method: "post",
      body: { otp: otp },
      onSuccess: (res) => {
        setLoading(false);
         toast.success("Successfully Registered to Eduhub.")
        dispatch(setUser(res.user.user));
        navigate("/");
      },
    });
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
                Verify Your Email
              </CardTitle>
              <CardDescription>
                Enter your OTP that sent to your Email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3 items-center text-center justify-center">
                      <label htmlFor="email">OTP</label>
                      <InputOTP
                        onChange={(value) => setOtp(value)}
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
                        className="w-full bg-teal-500 hover:bg-teal-300 text-white"
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

export default Otp;
