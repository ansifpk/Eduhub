import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";
import { CardHeader,CardTitle,CardDescription, CardContent } from "../../components/ui/card";


const Otp = () => {
  const [second,setSecond] = useState(59)
  const [minutes,setMinute] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams()
  const [otp,setOtp]= useState("");
  const [loading,setLoading]= useState(false);
  const {doRequest,errors} = useRequest();
  const {doRequest:optResend,errors:resendErrors} = useRequest();
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

     await optResend({
      url:userRoutes.resentOtp,
      method:"post",
      body:{email:id},
      onSuccess:()=>{
        setSecond(59);
        setMinute(1);
        toast.success("Resnt OTP Sent to Your Mail")
      }
    })
  }

  const handleSubmit = async(e:FormEvent) => {
     try {
       e.preventDefault();
      if(id){
        setLoading(true)
        doRequest({
          url:userRoutes.verifyOtp,
          method:"post",
          body:{otp,id},
          onSuccess:(res)=>{
            dispatch(setUser(res.user.user))
            toast.success("Register Successfull")
            return navigate("/home")
          }
        })
      }
     } catch (error) {
      console.error(error)
     }
  }
  useEffect(()=>{
    setLoading(false)
    errors?.map((err)=>toast.error(err.message))
    resendErrors?.map((err)=>toast.error(err.message))
  },[errors,resendErrors])
  return (
  
    <div  className="flex  items-center justify-center min-h-svh">
     <div>
     <CardHeader>
      <CardTitle>Verify Email</CardTitle>
      <CardDescription>
        Enter your OTP that sent to your Email address.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <p>
            Time Remaining:{" "}
            <span style={{ color: "black", fontWeight: 600 }}>
              {minutes! < 10 ? `0${minutes}` : minutes}:
              {second! < 10 ? `0${second}` : second}
            </span>
          </p>

          <Button
            type="button"
            className="w-full"
            disabled={second > 0 || minutes > 0}
            onClick={resentOTP}
          >
            Resent OTP
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || otp.length <=0}
           
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifiying OTP
              </>
            ) : (
              <>
                Verify
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center">
            <p
              onClick={() => navigate('/users/login')}
              className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
            >
              Back to Login
            </p>
          </div>
        </div>
      </form>
    </CardContent>
     </div>
  </div>
  )
}

export default Otp
