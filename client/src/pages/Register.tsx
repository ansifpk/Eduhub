import React, { useEffect, useState } from "react";
import std from '../assets/home-page/studnet.jpg'
import {  useNavigate } from "react-router-dom";
import { signup } from "@/Api/user";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ArrowRight, EyeOff, Loader2 } from "lucide-react";
import { Input } from "../Components/ui/input";
import UserAuthHeader from "../Components/user/UserAuthHeader";
import { CardDescription, CardHeader } from "../Components/ui/card";
// import { Button } from "@/Components/ui/button";
import {Button} from '../Components/ui/button'

const Register:React.FC = () => {
  interface User{
    id:string,
    name:string,
    email:string,
    isVerified:boolean,
    isBlock:boolean,
    isAdmin:boolean,
    isInstructor:boolean,
 }
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [name,setName] = useState("");
    const [isLoading,setLoading] = useState(false);
    const navigate = useNavigate();
    const id = useSelector((state:User) => state.id)
    useEffect(()=>{
      if(id){
       return navigate('/')
      }
    },[navigate,id]);
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const user = {
          name:name.trim(),
          email:email,
          password:password
        };   
        e.preventDefault();
        
        let response;
        if(/^[A-Za-z]+(?:[A-Za-z]+)?$/.test(name)){
          if(/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email)){
            if(password.trim().length==0){
              setLoading(false)
              return toast.error(`Enter Password`)
            }else if(password.trim().length<8){
              setLoading(false)
              return toast.error(`Enter a Strong Password`)
            }else if(password.trim().length>13){
              setLoading(false)
              
              return toast.error(`Maximum 12 digits`)
            }else if(password.trim()!==confirmPassword.trim()){
              setLoading(false)
              return toast.error(`Confirm Password not Match`)
            }else{
              try {
                setLoading(true)
                 response = await signup(user)

              if(response.succes){
                  localStorage.setItem("verifyToken",response.verifyToken);
                   toast.success("otp sent to your mail")
                   setLoading(false)
                   return navigate(`/users/otp/${email}`)
               }else{
                setLoading(false)
                 toast.error(response.response.data.message)
               }
              } catch (err) {
                toast.error("somthing went wrong");
              }
            }
          }else{
            
            return toast.error(`Invalid Email Structure`)
          }
        }else{
          
          return toast.error(`Invalid Name`)
        }
    }
    
  return (
    
      <div>
    <div className='row pt-5'>
        <div className='col-6 mx-4'>
                   <img  style={{borderRadius:'25px',height:'100vh' }} src={std} alt="" />
        </div>
        <div className='col-5  p-2 rounded-5 border-1 border-[#49BBBD]'>
            <UserAuthHeader />
        <div>
       <form  onSubmit={handleSubmit}>
          <div className="space-y-4">
             <div className="space-y-2 flex flex-col items-center">
                 <label className="w-1/2 text-sm font-medium text-gray-700">
                    Email Address
                 </label>
                     <Input
                       id="email"
                       type="email"
                       placeholder="Enter your Email"
                       value={email}
                       required
                       onChange={(e) => setEmail(e.target.value.trim())}
                       className="w-1/2 rounded-full p-2 border-1 border-[#49BBBD]"
                       
                     />
              </div>

              <div className="space-y-2 flex flex-col items-center">
                     <label className="w-1/2 text-sm font-medium text-gray-700">
                        Name
                     </label>
                     <Input
                       id="name"
                       type="string"
                       required
                       placeholder="Enter your name"
                       value={name}
                       onChange={(e) => setName(e.target.value.trim())}
                       className="w-1/2 rounded-full p-2 border-1 border-[#49BBBD]"
                       
                     />
              </div>
              <div className="space-y-2 flex flex-col items-center">
                     <label className="w-1/2 text-sm font-medium text-gray-700">
                       Password
                     </label>
                     <Input
                       id="password"
                       type="password"
                       required
                       placeholder="Enter your password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value.trim())}
                       className="w-1/2 rounded-full p-2 border-1 border-[#49BBBD]"
                       
                     />
              </div>
              <div className="space-y-2 flex flex-col items-center">
                     <label className="w-1/2 text-sm font-medium text-gray-700">
                     Confirm Password
                     </label>
                     <Input
                       id="confirmPassword"
                       type="password"
                       required
                       placeholder="Confirm your password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value.trim())}
                       className="w-1/2 rounded-full p-2 border-1 border-[#49BBBD]"
                     />
                    
              </div>
        <div className="flex justify-evenly">
          <div>
            <Button type="submit" disabled={isLoading} className="bg-[#5BBFB5] text-white px-4 py-2   rounded-full hover:bg-[#4ca99f] transition-colors">
              {isLoading?(
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP
                 </>
                ):(
                  <>
                    Register<ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
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

export default Register
