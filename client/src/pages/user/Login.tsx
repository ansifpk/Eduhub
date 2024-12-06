import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { googleLogin, userLogin } from "../../Api/user"
import std from '../../assets/home-page/studnet.jpg'
import '../Register.css'
import { setUser } from "../../redux/authSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {toast} from 'react-hot-toast'
import { Input } from "@/Components/ui/input"
import UserAuthHeader from "@/Components/user/UserAuthHeader"
import { CardDescription, CardHeader } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Icons } from "@/Components/icons"
import axios from "axios"
import { useGoogleLogin } from "@react-oauth/google"
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
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useSelector((state:User)=>state.id);
    useEffect(()=>{
      if(id){
       return navigate('/')
      }
    },[navigate,id]);


    const login = useGoogleLogin({
      onSuccess: async credentialResponse =>{
        try {
          const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers:{
              Authorization:`Bearer ${credentialResponse.access_token}`,
            },
          }
        );
        const response = await googleLogin({email:res.data.email,name:res.data.name,password:res.data.sub})
        console.log(response);
        if(response.success){
          localStorage.setItem("accessToken",response.user.token.accessToken)
          localStorage.setItem("refreshToken",response.user.token.refreshToken)
          dispatch(setUser(response.user.user))
          toast.success("Login Successfully")
          return navigate("/")
        }else{
          toast.error(response.response.data.message);
        }
        
        } catch (error) {
          console.error(error)
        }
      } ,
      onError: () => {
        toast.error("Google login failed");
    },
    });




    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
       e.preventDefault();
      const response = await userLogin({email,password})
      console.log(response);
      
      if(response.user){
        localStorage.setItem("accessToken",response.token.accessToken)
        localStorage.setItem("refreshToken",response.token.refreshToken)
         dispatch(setUser(response.user))
        return navigate("/")
      }else{
        return toast.error(response.response.data.message)
      }
    }
  return (
  <div>
    <div className='row pt-5'>
        <div className='col-6 mx-4 '>
            <CardHeader>
                <CardDescription  className='text-center'>
                <img  style={{borderRadius:'25px'}} src={std} alt="" />
                </CardDescription>
            </CardHeader>
        </div>
        <div className='col-5  p-2 rounded-5 border-1 border-[#49BBBD] '>
            <UserAuthHeader />
        <div>
       <form  onSubmit={handleSubmit}>
          <div className="space-y-4">
             <div className=" flex flex-col items-center">
                 <label className="w-1/2 text-sm font-medium text-gray-700">
                    Email Address
                 </label>
                  <Input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="w-1/2 rounded-full p-2 border-1 border-blue-900"                       
                  />
              </div>

              <div className=" flex flex-col items-center">
                     <label className="w-1/2 text-sm font-medium text-gray-700">
                       Password
                     </label>
                     <Input
                       id="password"
                       type="password"
                       placeholder="Enter your password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value.trim())}
                       className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                       
                     />
              </div>
        <div className="flex justify-center gap-14">
          <div >
            <button className="bg-[#5BBFB5] text-white px-4 py-2  rounded-full hover:bg-[#4ca99f] transition-colors">
              Login
            </button>
          </div>
          <div className="underline  cursor-pointer" onClick={()=>navigate("/users/forgetPassword")} >Forget Password?</div>
        </div>
        <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div >
          <div className=" flex flex-col jestify-center items-center">
              <Button variant="outline" onClick={()=>login()} type="button" >
            <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              </div>
      </div>
      </div>
      </form>
       </div>
      </div>
     </div>
   </div>
  )
}

export default Login
