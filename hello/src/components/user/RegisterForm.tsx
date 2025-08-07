import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import Forstudents from "../../assets/home-page/studnet.jpg";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormInputs } from "@/util/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import userRoutes from "@/service/endPoints/userEndPoints";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);  
  const navigate = useNavigate();
  const {doRequest,err} = useRequest();
    const {
      register,
      handleSubmit,
      formState: {errors },
    } = useForm<RegisterFormInputs>({
      resolver: zodResolver(registerSchema),
    });  

  const onSubmit = async(data:RegisterFormInputs) => {
    setLoading(true)
     await doRequest({
      url:userRoutes.signUp,
      method:"post",
      body:{ email: data.email, password: data.password,mobile:data.mobile,name:data.name },
      onSuccess:(res)=>{
        setLoading(false)
        toast.success(res.message)
        navigate(`/user/otp/${data.email}`);
      }
    })
  }

  useEffect(()=>{
      setLoading(false);
       err?.map((err)=>toast.error(err.message))
  },[err])

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
            <div className="bg-muted relative hidden md:block">
            <img
              src={Forstudents}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-2 md:px-8">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-teal-400">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Create your EduHub Account
                </p>
              </div>
              <Tabs defaultValue="Register" className="flex items-center">
                <TabsList className="bg-teal-500">
                    <TabsTrigger value="Login"><NavLink to={'/signIn'} >Login</NavLink></TabsTrigger>
                    <TabsTrigger value="Register">Register</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="grid">
                <label htmlFor="email" className={errors.email&&"text-red-500"}> {errors.email?errors.email.message:"Email"} </label>
                <input
                  id="email"
                  type="text"
                  placeholder="please enter a email"
                   {...register("email")} 
                  className="border py-2 rounded-full px-2 border-teal-300  focus:border-3 focus:border-teal-300" 
                />
              </div>
              <div className="grid">
                <label htmlFor="name" className={errors.name&&"text-red-500"} > {errors.name?errors.name.message:"Name"} </label>
                <input
                  id="name"
                  type="text"
                   {...register("name")} 
                  placeholder="please enter your name"
                  className="border py-2 rounded-full px-2 border-teal-300 focus:border-3 focus:border-teal-300"
                />
              </div>
              <div className="grid">
                <label htmlFor="mobile" className={errors.mobile&&"text-red-500"}>{errors.mobile?errors.mobile.message:"Mobile"}</label>
                <input
                  id="mobile"
                  type="number"
                   {...register("mobile")} 
                  placeholder="please enter your mobile number"
                  className="border py-2 rounded-full px-2 border-teal-300 focus:border-3 focus:border-teal-300"
                />
              </div>
              <div className="grid relative">
                <div className="flex items-center">
                  <label htmlFor="password"className={errors.password&&"text-red-500"}>{errors.password?errors.password.message:"Password"}</label>
                </div>
                <input id="password"  {...register("password")}   placeholder="please enter a password" className="border py-2 rounded-full px-2 border-teal-300 focus:border-3 focus:border-teal-300" type={show?"text":"password" } />
                <button
                    type="button"
                    onClick={()=>setShow(!show)}
                    className="absolute right-3 top-10 transform -translate-y-1/2  text-gray-500 hover:text-gray-700"
                >
                    <i className={`bi ${show?" bi-eye-slash-fill":"bi bi-eye-fill"}  relative z-50`}></i>
                </button>
              </div>
              <Button type="submit" className={`w-full bg-teal-500 hover:bg-teal-300 cursor-pointer `} disabled={loading?true:false}>
                {
                    loading?<>
                     Register...
                     <i className="bi bi-arrow-repeat animate-spin"></i>
                    </>
                    :
                    "Register"

                }
                
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-1">
             
                <Button variant="outline" type="button" className="w-full text-white cursor-pointer bg-teal-500 hover:bg-teal-300">
                         <i className="bi bi-google  cursor-pointer" ></i> 
                </Button>
              
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default RegisterForm


