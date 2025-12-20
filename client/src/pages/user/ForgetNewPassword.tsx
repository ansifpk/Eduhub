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
  newPasswordScheema,
  type NewPasswordFormInputs,
} from "@/util/schemas/newPasswordScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  email: string;
}
const ForgetNewPassword: React.FC<Props> = ({ email }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewPasswordFormInputs>({
    resolver: zodResolver(newPasswordScheema),
  });

  const handlePassword = (data: NewPasswordFormInputs) => {
    console.log("data", data);
    // setIsLoading(true);
    doRequest({
      url: userRoutes.newPassword,
      body: {
        email,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      method: "post",
      onSuccess: () => {
        setIsLoading(false);
        toast.success("Forget Password Successfully");
        navigate("/signIn");
      },
    });
  };

  useEffect(() => {
    setIsLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Please enter your new password below
            <br />
            Note:* Password must be in Between 8 - 20 charector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handlePassword)} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("newPassword")}
                  className="pr-10 border border-teal-600 w-full p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="pr-10 border border-teal-600 w-full p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full transition-all hover:scale-105 bg-teal-400 hover:bg-teal-600 rounded p-2 text-white font-bold cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </CardContent>
        <span className="text-center text-sm underline">
          <Link to={"/signIn"}>Back to Login</Link>
        </span>
      </Card>
    </div>
  );
};

export default React.memo(ForgetNewPassword);
