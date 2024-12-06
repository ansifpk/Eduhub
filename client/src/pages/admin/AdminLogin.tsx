import { useEffect, useState } from "react"
import './adminLogin.css'
import { User } from "@/@types/userType"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { adminLogin } from "@/Api/admin"
import { useDispatch } from "react-redux"
import {setAdmin} from "@/redux/authSlice";




const AdminLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setisLoading] = useState(false)
    const navigate = useNavigate();
    const id = useSelector((state:User)=>state.isAdmin);
    const dispatch = useDispatch()
    
    useEffect(()=>{
      if(id){
       return navigate('/admin/home')
      }
    },[id]);

   
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
