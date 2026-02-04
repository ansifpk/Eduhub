import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import Forstudents from "../../assets/home-page/studnet.jpg";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormInputs } from "@/util/schemas/loginSchema";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import toast from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import { useGoogleLogin, type TokenResponse, } from "@react-oauth/google";
import axios from "axios";

const LoginForm = () => {

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {doRequest,err} = useRequest();
  const {
    register,
    handleSubmit,
    formState: {errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });  

  const onSubmit = async(data:LoginFormInputs) => {
    setLoading(true)
     await doRequest({
      url:userRoutes.login,
      method:"post",
      body:{ email: data.email, password: data.password },
      onSuccess:(res)=>{
        setLoading(false)
        navigate("/")
        dispatch(setUser(res.user))
      }
    })
  }


const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
    try {
      const { data: userData } = await axios.get(
        import.meta.env.VITE_GOOGLE_AUTH_URL,
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      console.log(userData);
      
      await doRequest({
      url:userRoutes.googleLogin,
      method:"post",
      body:{ email: userData.email, name: userData.name, password: userData.sub },
      onSuccess:(res)=>{
        navigate("/")
        console.log("user",res);
        
        dispatch(setUser(res.user.user))
      }
    })
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
      
    },
    onError: () => {
      console.error("Google login failed");
    },
  });



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
              id="image"
              src={Forstudents}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col ">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-teal-400">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your EduHub Account
                </p>
              </div>
              <Tabs defaultValue="Login" className="flex items-center">
                <TabsList className="bg-teal-500">
                    <TabsTrigger value="Login"><NavLink to={'/signIn'} >Login</NavLink></TabsTrigger>
                    <TabsTrigger value="Register"><NavLink to={'/signUp'} >Register</NavLink></TabsTrigger>              
                </TabsList>
              </Tabs>
              <div className="grid gap-3">
                <label htmlFor="email" className={errors.email&&"text-red-500"}>{errors.email?errors.email.message:"Email"}</label>
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
                    <label htmlFor="password" className={errors.password&&"text-red-500"}>{errors.password?errors.password.message:"Password"}</label>
                </div>
                <input  {...register("password")}  id="password" placeholder="please enter your password" className="border py-1 rounded-full px-2 border-teal-300" type={show?"text":"password" } />
                <button
                    type="button"
                    onClick={()=>setShow(!show)}
                    className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    <i className={`bi ${show?" bi-eye-slash-fill":"bi bi-eye-fill"}  relative z-50`}></i>
                </button>
              </div>
               <span
                    onClick={()=>navigate('/forgetPassword')}
                    className="ml-auto text-sm underline-offset-2 my-2 cursor-pointer hover:underline"
                  >
                    Forgot your password?
                  </span>
              <Button type="submit" className={`w-full bg-teal-400 hover:bg-teal-400 cursor-pointer`} disabled={loading?true:false}>
                
                {
                    loading?<>
                     Loading...
                     <i className="bi bi-arrow-repeat animate-spin"></i>
                    </>
                    :
                    "Login"

                }
               
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
            </div>
          <div className="grid grid-cols-1 justify-center-safe items-center-safe">
                 
                <Button disabled={loading?true:false} variant="outline" onClick={()=>handleGoogleLogin()}  type="button" className="w-full text-white cursor-pointer bg-teal-500 hover:bg-teal-300">
                         <i className="bi bi-google  cursor-pointer" ></i> 
                </Button>

                
              
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

export default LoginForm


