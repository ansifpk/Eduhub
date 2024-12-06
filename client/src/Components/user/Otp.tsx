import { useEffect, useState } from "react"
import './otp.css'
import { otpVerify, resentOtp } from "@/Api/user";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";

const Otp = () => {
  const [second,setSecond] = useState(59)
  const [minutes,setMinute] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams()
  const [otp,setOtp]= useState("");

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
      console.log("otp in otp page",otp,id);
     if(id){
       const response = await otpVerify(otp,id) ;
     
       
       if(response.succusse){
        dispatch(setUser(response.user.user))
        toast.success("Register Successfull")
        return navigate("/")
       }else{
        toast.error(response.response.data.message);
       }
     }
     } catch (error) {
      console.log("err",error)
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
           <button type="submit" onClick={handleSUbmit} className='submit-btn' >Verify</button>
       </div>
    </div>
  )
}

export default Otp
