import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import std from '../../assets/home-page/teacher-home.jpg'
import {  setUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { CardDescription, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import InstructorAuthHead from "../../Components/instructor/instructorAuthHead";
import { loginInstructor } from "@/Api/instructor";


const InstructorLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

        const data = await loginInstructor(password,email)
     
        if(data.instructor){
             if(data.instructor.isInstructor){
         
           
              dispatch(setUser(data.instructor))
              navigate("/instructor")
              
              
              toast.success("Instructor Login Successfully")
             }else{
              toast.error("Your Not Instructor")
             }
        }else{
          toast.error(data.response.data.message)
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
            <InstructorAuthHead />
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-1/2 rounded-full p-2 border-1 border-blue-900"                       
                  />
              </div>

              <div className="space-y-2 flex flex-col items-center">
                     <label className="w-1/2 text-sm font-medium text-gray-700">
                       Password
                     </label>
                     <Input
                       id="password"
                       type="password"
                       placeholder="Enter your password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                       
                     />
              </div>
        <div className="flex justify-evenly">
          <div>
            <button className="bg-[#5BBFB5] text-white px-4 py-2  rounded-full hover:bg-[#4ca99f] transition-colors">
              Login
            </button>
          </div>
        </div>
        <div className="text-center">
           <p onClick={()=>navigate("/users/login")} className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer">
              Back to Login
           </p>
        </div>
    </div>
      </form>
       </div>
      </div>
     </div>
   </div>
  )
}

export default InstructorLogin
