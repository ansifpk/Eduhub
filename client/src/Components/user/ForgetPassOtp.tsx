import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { resentOtp, verifyPassOtp } from '@/Api/user'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface ForgetPassOtpProps {
    sucessCheckOTP: React.Dispatch<React.SetStateAction<boolean | null>>;
    email: React.Dispatch<React.SetStateAction<any>>;
}

const ForgetPassOtp:React.FC<ForgetPassOtpProps> = ({sucessCheckOTP,email}) => {
  const [second,setSecond] = useState(59)
  const [minutes,setMinute] = useState(1)
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
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

    const handleOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          
           const response = await verifyPassOtp(email.toString(),otp)
           if(response.sucess){
            setSuccess(true);
            sucessCheckOTP(true)
            setOtp('');
            setIsLoading(false);
           }else{
            toast.error(response.response.data.message);
           }
          
        } catch (err) {
          setError('An error occurred while sending the reset link. Please try again.');
        } 
      };
      const resentOTP = async() => {

        const response:any = await resentOtp(email.toString())
        console.log(response)
        if(response.success){
          return  toast.success("Resnt OTP Sent to Your Mail")
        }else{
          toast.error(response.response.data.message)
        }
    
      }
      const validateOtp = (otp: string) => {
        return otp.length == 6
      };

  return (
    <div>
              <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
             <CardDescription>
             Enter your OTP that sent to your Email address.
             </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleOTP}>
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

               {error && (
                 <Alert variant="destructive">
                   <AlertCircle className="h-4 w-4" />
                   <AlertDescription>{error}</AlertDescription>
                 </Alert>
               )}
                             <p>
              Time Remaining:{" "}
              <span style={{color:"black", fontWeight:600}}>
                {minutes!<10?`0${minutes}`:minutes}:
                {second!<10?`0${second}`:second}
              </span>
             </p>

               <Button
                 type="button"
                 className="w-full"
                 disabled={second>0||minutes>0}
                 onClick={resentOTP}
               >
                     Resent OTP
                     <ArrowRight className="ml-2 h-4 w-4" />
  
               </Button>
               <Button
                 type="submit"
                 className="w-full"
                 disabled={!validateOtp(otp) || isLoading}
               >
                 {isLoading ? (
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
                   onClick={()=>navigate(-1)}
                   className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
                 >
                   Back to Login
                 </p>
               </div>
             </div>
           </form>
        </CardContent>
    </div>
  )
}

export default ForgetPassOtp
