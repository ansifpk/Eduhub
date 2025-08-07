import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/useRequest'
import userRoutes from '../../service/endPoints/userEndPoints'

interface ForgetPassEmailProps {
    successCheckEmail: React.Dispatch<React.SetStateAction<boolean | null>>;
    setEmailProp: React.Dispatch<React.SetStateAction<any>>;
}

const ForgetPassEmail:React.FC<ForgetPassEmailProps> = ({successCheckEmail,setEmailProp}) => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()
    const {doRequest,errors} = useRequest();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setIsLoading(true);
        setError(null);
        doRequest({
          url:userRoutes.verifyEmail,
          body:{email},
          method:"post",
          onSuccess:()=>{
            toast.success("otp sent to your email")
            successCheckEmail(true);
            setEmailProp(email);
            setEmail('');
            setIsLoading(false);
          }
        })
        
      };
    
      const validateEmail = (email: string) => {
        return /^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email);
      };

     useEffect(()=>{
      setIsLoading(false);
      errors?.map((err)=>toast.error(err.message))
     },[errors]);

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
                 className="w-full bg-teal-400 hover:bg-teal-600"
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
