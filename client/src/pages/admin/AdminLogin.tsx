import { useEffect, useState } from "react"
import './adminLogin.css'
import { User } from "@/@types/userType"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { adminLogin, googleLogin } from "@/Api/admin"
import { useDispatch } from "react-redux"
import {setAdmin} from "@/redux/authSlice";
import { Button } from "@/Components/ui/button"
import { Icons } from "@/Components/icons";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"
import { jwtDecode } from "jwt-decode";



const AdminLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setisLoading] = useState(false)
    const navigate = useNavigate();
    const id = useSelector((state:User)=>state.id);
    const dispatch = useDispatch()
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
        if(response.success){
          console.log(response);
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

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const response = await adminLogin({email,password});
        console.log("admin login",response)
        if(response.admin){
          toast.success("Adming Login Successfull")
          dispatch(setAdmin(response.admin))
          return navigate("/admin/home")
        }else{
          toast.error(response.response.data.message)
        }
    }
  return (
      <div className="instructor-log">
          <div className="instructor-join" style={{background: 'white'}}>
          <h3>Admin Login</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Email</label>
                <input className="login-input" required type="text" value={email} onChange={(e) => setEmail(e.target.value.trim())}   placeholder="Enter name" />
              </div>
              <div>
                <label htmlFor="">Password</label>
                <input className="login-input" required  type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())}    placeholder="Enter password" />
              </div>
              <button className="button-join" >Login</button>
            </form>
        </div>
      </div>
  )
}

export default AdminLogin
