import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import useRequest from "@/hooks/useRequest";
import { setAdmin } from "@/redux/authSlice";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import { loginSchema, type LoginFormInputs } from "@/util/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {doRequest,err} = useRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormInputs) => {
    setLoading(true);
      doRequest({
        url:adminRoutes.login,
        method:"post",
        body:{ email: data.email, password: data.password },
        onSuccess:(res)=>{
          setLoading(false)
          dispatch(setAdmin(res.admin));
          navigate("/admin/")
        }
      })
  };

   useEffect(()=>{
      setLoading(false)
      err?.map((err)=>toast.error(err.message))
    },[err]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={"flex flex-col gap-6"}>
          <Card className="shadow-lg border border-purple-500" >
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back Admin</CardTitle>
              <CardDescription>Login with password and email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <label htmlFor="email">Email</label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        className="border border-purple-500 py-2 rounded px-2"
                        
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        placeholder="enter password"
                        className="border border-purple-500 py-2 rounded px-2"
                        {...register("password")}
                        type="password"
                        
                      />
                      {errors.password && (
                        <p className="text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <button  type="submit" disabled={loading} className="w-full cursor-pointer text-white bg-purple-500 hover:bg-purple-300 rounded  font-semibold py-2">
                      Login
                    </button>
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

export default Login;
