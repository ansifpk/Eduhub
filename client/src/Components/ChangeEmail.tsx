import React, { useState } from 'react'
import Header from './Header/Header'
import ProfileNavbar from './Header/ProfileNavbar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import Footer from './Footer/Footer'
import { ArrowRight, Loader2 } from 'lucide-react'
import { logout, settingEmail, veryfyNewEmail } from '@/Api/user'
import { useSelector } from 'react-redux'
import { IUser } from '@/@types/chatUser'
import { User } from '@/@types/userType'
import toast from 'react-hot-toast'
import { changeEmail, removeUser } from '@/redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const ChangeEmail = () => {
    const [email,setEmail] = useState("");
    const [otp,setOTP] = useState("");
    const [comingOtp,setComingOtp] = useState("");
    const [page,setPage] = useState(1);

    const [success,setSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errors,setErrors] = useState({
        email:false,
        otp:false
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userId = useSelector((state:User)=>state.id)

     const validateEmail = (email: string) => {
        return /^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email);
      };

    const handleEmail = async ()=>{
        try {
            setIsLoading(true)
             console.log(userId,email);
            const response = await veryfyNewEmail(userId,email);
            console.log(response,"hu");
            if(response.success){
                setIsLoading(false)
                setPage(2)
                setComingOtp(response.otp);
            }else if(response.status == 403){
                setIsLoading(false)
                const resp = await logout();
                if (resp.succuss) {
                  localStorage.setItem("accessToken", "");
                  localStorage.setItem("refreshToken", "");
                  dispatch(removeUser());
                  toast.error(response.response.data.message);
                  return navigate("/users/login");
                }
              }else{
                setIsLoading(false)
                return toast.error(response.response.data.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
   
    const updateEmail  = async () => {

        const response = await settingEmail(userId,email,otp);
        if(response.success){
            dispatch(changeEmail(response.user.email))
            toast.success("Email chnaged successfully")
            return navigate("/profile");
        }else if(response.status == 403){
            setIsLoading(false)
            const resp = await logout();
            if (resp.succuss) {
              localStorage.setItem("accessToken", "");
              localStorage.setItem("refreshToken", "");
              dispatch(removeUser());
              toast.error(response.response.data.message);
              return navigate("/users/login");
            }
          }else{
            setIsLoading(false)
            return toast.error(response.response.data.message)
        }
    }

  return (
    <div className="bg-blue-50">
    <Header />
    <ProfileNavbar />
    <main className="w-full flex justify-center  gap-10 py-8">
      {page == 1?(
         <div className="grid w-50 gap-1.5">
         <h3>Change your Email</h3>
         <div className="grid  gap-1.5">
           <Label htmlFor="message-2">Enter New Email</Label>
           <div className="relative">
             <Input
               value={email}
               onChange={(e) => setEmail(e.target.value.trim())}
               placeholder="Current password"
               className="rounded-full hover:border-teal-500 border-1 border-teal-500"
               required
             />
           </div>
           {errors.email && (
             <div className="text-sm text-danger text-muted-foreground">
               Please enter a Valid Email
             </div>
           )}
         </div>
         <div className="flex justify-center">
           <AlertDialog>
             <AlertDialogTrigger asChild>
               <Button  disabled={!validateEmail(email) || isLoading} className="w-25 rounded bg-teal-400 hover:bg-teal-400">
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
             </AlertDialogTrigger>
             <AlertDialogContent>
               <AlertDialogHeader>
                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                 <AlertDialogDescription>
                   Are yu sure you want to save this email?
                 </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                 <AlertDialogAction className="bg-teal-400 hover:bg-teal-400">
                   Cancel
                 </AlertDialogAction>
                 <AlertDialogAction
                   className="bg-teal-400 hover:bg-teal-400"
                   onClick={handleEmail}
                 >
                   Continue
                 </AlertDialogAction>
               </AlertDialogFooter>
             </AlertDialogContent>
           </AlertDialog>
         </div>
       </div>
      ):(
        <div className="grid w-50 gap-1.5">
        <h3>Enter the otp that send to thi Email {email} </h3>
        <div className="grid  gap-1.5">
          <Label htmlFor="message-2">Enter OTP</Label>
          <div className="relative">
            <Input
              maxLength={6}
              value={otp}
              onChange={(e) => setOTP(e.target.value.trim())}
              placeholder="Current password"
              className="rounded-full hover:border-teal-500 border-1 border-teal-500"
              required
            />
          </div>
          {errors.otp && (
            <div className="text-sm text-danger text-muted-foreground">
              Invalid OTP
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-25 rounded bg-teal-400 hover:bg-teal-400">
                reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to submit your answers? you cannot re
                  attend this test.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="bg-teal-400 hover:bg-teal-400">
                  Cancel
                </AlertDialogAction>
                <AlertDialogAction
                  className="bg-teal-400 hover:bg-teal-400"
                  onClick={updateEmail}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      )}
    </main>
    <Footer />
  </div>
  )
}

export default ChangeEmail
