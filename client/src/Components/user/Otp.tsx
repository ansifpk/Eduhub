import { useEffect, useState } from "react"
import './otp.css'
import { otpVerify, resentOtp } from "@/Api/user";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const Otp = () => {
  const [second,setSecond] = useState(59)
  const [minutes,setMinute] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams()
  const [otp,setOtp]= useState("");
  const [loading,setLoading]= useState(false);

  useEffect(()=>{
    const intervel = setInterval(() => {
       if(second > 0){
        setSecond(second-1);
       }
       if(second === 0){
        if(minutes === 0){
           clearInterval(intervel)
        }else{
          setSecond(59)
          setMinute(minutes-1)
        }
       }
    }, 1000);
    return () => {
      clearInterval(intervel);
    }
  },[second])

  const resentOTP = async() => {

    const response:any = await resentOtp(id!)
    
    if(response.success){
      return  toast.success("Resnt OTP Sent to Your Mail")
    }else{
      toast.error(response.response.data.message)
    }

  }

  const handleSUbmit = async() => {
     try {

     if(id){
      setLoading(true)
       const response = await otpVerify(otp,id) ;
     
       
       if(response.succusse){
        setLoading(false)
        dispatch(setUser(response.user.user))
        toast.success("Register Successfull")
        return navigate("/")
       }else{
        setLoading(false)
        toast.error(response.response.data.message);
       }
     }
     } catch (error) {
      console.error(error)
     }
  }

  return (
    <div className="container">
       <div className="card" style={{background:'aqua'}}>
           <h4>Verify OTP</h4>
           <input type="text" 
            placeholder="Enter 6 Digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e)=>setOtp(e.target.value)}
           />
           { <div className="countdown-text">
             <p>
              Time Remaining:{" "}
              <span style={{color:"black", fontWeight:600}}>
                {minutes!<10?`0${minutes}`:minutes}:
                {second!<10?`0${second}`:second}
              </span>
             </p>
             <button 
             disabled={second>0||minutes>0}
             style={{color:second>0||minutes>0?"#DFE3E8":"#FF5630"}}
              type="submit" onClick={resentOTP} className='submit-btn' >Resend Otp</button>
           </div> } 
           <Button type="submit" disabled={loading} onClick={handleSUbmit} className="bg-black text-white px-4 py-2   rounded-full hover:bg-[#4ca99f] transition-colors">
              {loading?(
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying OTP
                 </>
                ):(
                  <>
                    Verify<ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
            </Button>
           
       </div>
    </div>
  )
}

export default Otp
