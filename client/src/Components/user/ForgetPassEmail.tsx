import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { forgetPassword } from '@/Api/user'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface ForgetPassEmailProps {
    successCheckEmail: React.Dispatch<React.SetStateAction<boolean | null>>;
    setEmailProp: React.Dispatch<React.SetStateAction<any>>;
}

const ForgetPassEmail:React.FC<ForgetPassEmailProps> = ({successCheckEmail,setEmailProp}) => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setIsLoading(true);
        setError(null);

        try {

          const data = await forgetPassword(email)
          // const {data} = await axios.post("http://localhost:3000/auth/user/forgetPassword",email)
      
          if(data.sucess){
            toast.success("otp sent to your email")
            setSuccess(true);
            successCheckEmail(true);
            setEmailProp(email);
            setEmail('');
            setIsLoading(false);
          }else{
            toast.error(data.response.data.message)
            setIsLoading(false);
          }
        } catch (err) {
          setError('An error occurred while sending the reset link. Please try again.');
        }
      };
    
      const validateEmail = (email: string) => {
        return /^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email);
      };

  return (
    <div>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
             <CardDescription>
                 Enter your email address and we'll send you a OTP to reset your password.
             </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit}>
             <div className="space-y-4">
               <div className="space-y-2">
                 <Input
                   type="email"
                   placeholder="Enter your Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
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

               <Button
                 type="submit"
                 className="w-full"
                 disabled={!validateEmail(email) || isLoading}
               >
                 {isLoading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Senting OTP
                   </>
                 ) : (
                   <>
                     Sent OTP
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

export default ForgetPassEmail
