import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Input } from "../ui/input";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";

interface ForgetPassOtpProps {
  sucessCheckOTP: React.Dispatch<React.SetStateAction<boolean | null>>;
  email: React.Dispatch<React.SetStateAction<any>>;
}

const ForgetPassOtp: React.FC<ForgetPassOtpProps> = ({
  sucessCheckOTP,
  email,
}) => {
  const [second, setSecond] = useState(59);
  const [minutes, setMinute] = useState(1);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const {doRequest,errors} = useRequest();

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

  const handleOTP = async (e: React.FormEvent) => {
      e.preventDefault();
      doRequest({
        url:userRoutes.verifyPassOtp,
        body:{email:email.toString(),otp},
        method:"post",
        onSuccess:()=>{
          setSuccess(true);
          sucessCheckOTP(true);
          setOtp("");
          setIsLoading(false);
        }
      })
  };

  const resentOTP = async () => {
    doRequest({
      url:userRoutes.resentOtp,
      body:{email:email.toString()},
      method:"post",
      onSuccess:()=>{
        return toast.success("Resnt OTP Sent to Your Mail");
      }
    })
  };

  const validateOtp = (otp: string) => {
    return otp.length == 6;
  };
  
  useEffect(()=>{
   errors?.map((err)=>toast.error(err.message))
  },[errors])
  return (
    <div>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your OTP that sent to your Email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOTP}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <p>
              Time Remaining:{" "}
              <span style={{ color: "black", fontWeight: 600 }}>
                {minutes! < 10 ? `0${minutes}` : minutes}:
                {second! < 10 ? `0${second}` : second}
              </span>
            </p>

            <Button
              type="button"
              className="w-full"
              disabled={second > 0 || minutes > 0}
              onClick={resentOTP}
            >
              Resent OTP
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={!validateOtp(otp) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifiying OTP
                </>
              ) : (
                <>
                  Verify
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p
                onClick={() => navigate(-1)}
                className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
              >
                Back to Login
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default ForgetPassOtp;
