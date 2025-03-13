import React, { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"
import std from '../../assets/home-page/studnet.jpg'
import '../Register.css'
import { setUser } from "../../redux/authSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {toast} from 'react-hot-toast'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

import axios from "axios"
import { useGoogleLogin } from "@react-oauth/google"
import useRequest from "@/hooks/useRequest"
import userRoutes from "@/service/endPoints/userEndPoints"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import LoginForm from "@/Components/user/LoginForm"
import RegisterForm from "@/Components/user/RegisterForm"
const Login:React.FC = () => {
  interface User{
    id:string,
    name:string,
    email:string,
    isVerified:boolean,
    isBlock:boolean,
    isAdmin:boolean,
    isInstructor:boolean,
 }
 
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const id = useSelector((state:User)=>state.id);
    
     //* google login user request
     const {doRequest,errors} = useRequest()
    
    useEffect(()=>{
      if(id){
       return navigate('/')
      }
    },[navigate,id]);


    const login = useGoogleLogin({
      onSuccess: async credentialResponse =>{
        try {
          const res = await axios.get(import.meta.env.VITE_GOOGLE_LOGIN_URL,{
            headers:{
              Authorization:`Bearer ${credentialResponse.access_token}`,
            },
          }
        );
        doRequest({
           url: userRoutes.googleLogin,
           method:"post",
           body:{email:res.data.email,name:res.data.name,password:res.data.sub},
           onSuccess:(res)=>{
            dispatch(setUser(res.user.user))
            navigate("/")
           }
        })
     
        } catch (error) {
          console.error(error)
        }
      } ,
      onError: () => {
        toast.error("Google login failed");
    },
    });

    useEffect(()=>{
      errors?.map((err)=>toast.error(err.message))
    },[errors])
    
  return (


    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div className="w-full max-w-sm md:max-w-3xl">
      <div className={"flex flex-col gap-6"}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2 ">
             <div className="relative hidden bg-muted md:block">
              <img
                src={std}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>

            <Tabs defaultValue="login" className="w-full ">
              <TabsList className="grid w-full grid-cols-2 bg-teal-300 text-white rounded-full mt-1 ">
                <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:rounded-full" value="login">Login</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:rounded-full" value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-teal-400 font-extrabold underline">Welcom to EduHub</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <LoginForm />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <div className="space-y-3">
                       <div className="text-xs">
                        OR CONTINUE WITH
                       </div>
                       <div className="border p-2 text-center rounded bg-teal-400">
                         <i className="bi bi-google text-white cursor-pointer" onClick={()=>login()}> Google</i> 
                       </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card>
                  <CardHeader className="text-center">
                  <CardTitle className="text-teal-400 font-extrabold underline">Welcom to EduHub</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <RegisterForm />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <div className="space-y-3">
                       <div className="text-xs">
                        OR CONTINUE WITH
                       </div>
                       <div className="border p-2 text-center rounded bg-teal-400">
                         <i className="bi bi-google text-white cursor-pointer" onClick={()=>login()}> Google</i> 
                       </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

  // <div>
  //   <div className='row pt-5'>
  //       <div className='col-6 mx-4 '>
  //           <CardHeader>
  //               <CardDescription  className='text-center'>
  //               <img  style={{borderRadius:'25px'}} src={std} alt="" />
  //               </CardDescription>
  //           </CardHeader>
  //       </div>
  //       <div className='col-5  p-2 rounded-5 border-1 border-[#49BBBD] '>
  //           <UserAuthHeader />
  //       <div>
  //      <form  onSubmit={handleSubmit}>
  //         <div className="space-y-4">
  //            <div className=" flex flex-col items-center">
  //                <label className="w-1/2 text-sm font-medium text-gray-700">
  //                   Email Address
  //                </label>
  //                 <Input
  //                 id="email"
  //                 type="email"
  //                 placeholder="Enter your Email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value.trim())}
  //                 className="w-1/2 rounded-full p-2 border-1 border-blue-900"                       
  //                 />
  //             </div>

  //             <div className=" flex flex-col items-center">
  //                    <label className="w-1/2 text-sm font-medium text-gray-700">
  //                      Password
  //                    </label>
  //                    <Input
  //                      id="password"
  //                      type="password"
  //                      placeholder="Enter your password"
  //                      value={password}
  //                      onChange={(e) => setPassword(e.target.value.trim())}
  //                      className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                       
  //                    />
  //             </div>
  //       <div className="flex justify-center gap-14">
  //         <div >
  //           <button className="bg-[#5BBFB5] text-white px-4 py-2  rounded-full hover:bg-[#4ca99f] transition-colors">
  //             Login
  //           </button>
  //         </div>
  //         <div className="underline  cursor-pointer" onClick={()=>navigate("/users/forgetPassword")} >Forget Password?</div>
  //       </div>
  //       <div className="relative">
  //       <div className="absolute inset-0 flex items-center">
  //         <span className="w-full border-t" />
  //       </div>
  //       <div className="relative flex justify-center text-xs uppercase">
  //         <span className="bg-background px-2 text-muted-foreground">
  //           Or continue with
  //         </span>
  //       </div>
  //     </div>
  //     <div >
  //         <div className=" flex flex-col jestify-center items-center">
  //             <Button variant="outline" onClick={()=>login()} type="button" >
  //             <Icons.google className="mr-2 h-4 w-4" />
  //               Google
  //             </Button>
  //             </div>
  //     </div>
  //     </div>
  //     </form>
  //      </div>
  //     </div>
  //    </div>
  //  </div>
  )
}

export default Login
