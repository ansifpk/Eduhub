import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import useRequest from "@/hooks/useRequest";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginSchema, type LoginFormInputs } from "@/util/schemas/loginSchema";
import toast from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import std from "../../assets/home-page/teacher-home.jpg";

const InstructorLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doRequest, err } = useRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    await doRequest({
      url: instructorRoutes.login,
      method: "post",
      body: { email: data.email, password: data.password },
      onSuccess: (res) => {
        setLoading(false);
        navigate("/instructor");
        dispatch(setUser(res.instructor));
      },
    });
  };

  useEffect(() => {
    setLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              id="image"
              src={std}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col ">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-teal-400">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-balance">
                  Login to your EduHub instructor Account
                </p>
              </div>
              <Tabs defaultValue="Login" className="flex items-center">
                <TabsList className="bg-teal-500">
                  <TabsTrigger value="Login">
                    <NavLink to={"/instructor/login"}>Login</NavLink>
                  </TabsTrigger>
                  <TabsTrigger value="Register">
                    <NavLink to={"/instructor/register"}>Register</NavLink>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
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
              <div className="grid gap-3 relative">
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className={errors.password && "text-red-500"}
                  >
                    {errors.password ? errors.password.message : "Password"}
                  </label>
                </div>
                <input
                  {...register("password")}
                  id="password"
                  placeholder="please enter your password"
                  className="border py-1 rounded-full px-2 border-teal-300"
                  type={show ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <i
                    className={`bi ${
                      show ? " bi-eye-slash-fill" : "bi bi-eye-fill"
                    }  relative z-50`}
                  ></i>
                </button>
              </div>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-2 my-2 hover:underline"
              >
                Forgot your password?
              </a>
              <button
                type="submit"
                className={`w-full bg-teal-500 py-1 font-bold text-white rounded hover:bg-teal-300 cursor-pointer`}
                disabled={loading ? true : false}
              >
                {loading ? (
                  <>
                    Loging...
                    <i className="bi bi-arrow-repeat animate-spin"></i>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default React.memo(InstructorLoginForm);
