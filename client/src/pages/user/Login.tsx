import React, { useEffect, useState } from "react"
import {  Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import std from '../../assets/home-page/studnet.jpg'
import { setUser } from "../../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-hot-toast'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import axios from "axios"
import { useGoogleLogin } from "@react-oauth/google"
// import { Tabs , TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs"
import useRequest from "../../hooks/useRequest"
import userRoutes from "../../service/endPoints/userEndPoints"
import LoginForm from "../../components/user/LoginForm"
import RegisterForm from "../../components/user/RegisterForm"
import { User } from "../../@types/userType"

const Login:React.FC = () => {
     
    const location = useLocation()
    const [active,setActive] = useState("")
    useEffect(()=>{location
      setActive(location.pathname == "/" ?"Login":"Register")
    },[location.pathname]);
    
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const id = useSelector((state:User)=>state.id)
    //  //* google login user request
    //  const {doRequest,errors} = useRequest();
    // useEffect(()=>{
    //    if(id){
    //      navigate(-1)
    //    }
    // },[id])
    const login = useGoogleLogin({
      onSuccess: async credentialResponse =>{
        try {
          const res = await axios.get(import.meta.env.VITE_GOOGLE_LOGIN_URL,{
            headers:{
              Authorization:`Bearer ${credentialResponse.access_token}`,
            },
          }
        );
        // doRequest({
        //    url: userRoutes.googleLogin,
        //    method:"post",
        //    body:{email:res.data.email,name:res.data.name,password:res.data.sub},
        //    onSuccess:(res)=>{
        //     dispatch(setUser(res.user.user))
        //     navigate("/")
        //    }
        // })
     
        } catch (error) {
          console.error(error)
        }
      } ,
      onError: () => {
        toast.error("Google login failed");
    },
    });

    // useEffect(()=>{
    //   errors?.map((err)=>toast.error(err.message))
    // },[errors])
     
    const handleChange = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        console.log(e.target);
    }

  return (


    <div className="flex min-h-svh flex-col items-center justify-center bg-muted ">
    <div className="w-full max-w-sm md:max-w-3xl">
      <div className={"flex flex-col gap-6"}>
        <div className="w-full border">
           <div className="grid md:grid-cols-2">
              <div className="hidden md:block bg-muted h-full w-full">
                <img src={std} alt="image" className="object-cover dark:brightness-[0.2] dark:grayscale w-full h-full" />
              </div>
              <div>
                <h3 className="text-center font-semibold">Welcome to EduHub</h3>
                <div className="flex space-x-5 text-white bg-teal-400  justify-center rounded-full ">
                  {[{name:"Login",path:"/"},{name:"Register",path:"/signUp"}].map((nav)=>(
                    <Link  key={nav.name} onClick={(e)=>setActive(e.currentTarget.textContent as string)} className={`nav-link ${active == nav.name ?"active bg-white text-black font-bold":"" } rounded-2xl px-4 py-1 m-1`} to={nav.path}>{nav.name}</Link>
                  ))}
                </div>
                 <Outlet/>
                  <div className="flex justify-center mt-3">
                    <div className="space-y-3">
                       <div className="text-xs">
                        OR CONTINUE WITH
                       </div>
                       <div className="border p-2 text-center rounded bg-teal-400">
                         <i className="bi bi-google text-white cursor-pointer" onClick={()=>login()}> Google</i> 
                       </div>
                    </div>
                  </div>
              </div>
              
              {/* <Tabs defaultValue="login" className="w-full ">
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
            </Tabs> */}
           </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
