import { Card, CardContent } from "@/components/ui/card";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import {
  forgetPasswordScheema,
  type ForgetPasswordFormInputs,
} from "@/util/schemas/forgetPasswordScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface Props {
  handlePage: (page: number) => void;
  handleEmail: (email: string) => void;
}

const ForgetPasswordEmail:React.FC<Props> = ({handlePage,handleEmail}) => {
  const [loading, setLoading] = useState(false);
  const { doRequest, err } = useRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormInputs>({
    resolver: zodResolver(forgetPasswordScheema),
  });

  const handleForget = (data: ForgetPasswordFormInputs) => {
    console.log(data);
    setLoading(true);
    doRequest({
      url: userRoutes.verifyEmail,
      method: "post",
      body: { email: data.email },
      onSuccess: () => {
        setLoading(false);
        toast.success("Successfully Sented the otp to your email")
        handlePage(2)
        handleEmail(data.email)
      },
    });
  };

  useEffect(()=>{
    setLoading(false);
    err?.map((err)=>toast.error(err.message))
  },[err])

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-1xl">
        <div className={"flex flex-col gap-6"}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-1">
              <form
                onSubmit={handleSubmit(handleForget)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-teal-400">EduHub</h1>
                    <p className="text-muted-foreground text-balance">
                      Enter your email to sent an otp to forget your passward
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
                      className="border p-2 rounded-full  border-teal-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full bg-teal-400 hover:bg-teal-400 rounded p-2 transition-all hover:scale-105 text-white font-semibold cursor-pointer`}
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                          <div className="flex justify-center-safe items-center-safe">
                            Loading...
                            <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          "Confirm"
                        )}

                  </button>
                  <span className="text-center text-sm underline"><Link to={"/signIn"}  >Back to Login</Link></span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ForgetPasswordEmail)
