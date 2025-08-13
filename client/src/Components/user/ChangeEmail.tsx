import  { useEffect, useState } from 'react'
import Header from '../Header/Header'
import ProfileNavbar from '../Header/ProfileNavbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Footer from '../Footer/Footer'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { User } from '../../@types/userType'
import toast from 'react-hot-toast'
import { changeEmail } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useRequest from '../../hooks/useRequest'
import userRoutes from '../../service/endPoints/userEndPoints'



const ChangeEmail = () => {
    const [email,setEmail] = useState("");
    const [otp,setOTP] = useState("");
    const [page,setPage] = useState(1);
    const {doRequest,err} = useRequest();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state:User)=>state.id)

    
   
     const validateEmail = (email: string) => {
        return /^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email);
      };

    const handleEmail = async ()=>{
        try {
            setIsLoading(true);
            doRequest({
              url:`${userRoutes.changeEmailVeryfy}/${userId}`,
              body:{email},
              method:"post",
              onSuccess:()=>{
                setIsLoading(false)
                setPage(2)
              }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const updateEmail = ()=>{
      doRequest({
        url:`${userRoutes.changeEmail}/${userId}`,
        body:{email,otp},
        method:"patch",
        onSuccess:(response)=>{
          dispatch(changeEmail(response.user.email))
          toast.success("Email chnaged successfully")
          return navigate("/profile");
        }
      })
  }
    
   
  useEffect(()=>{
    err?.map((err)=>toast.error(err.message))
  },[err]);


  return (
    <div className="bg-blue-50 ">
    <Header />
    <ProfileNavbar />
    <div className=''>
       {
        page==1?(
          <div className='w-full  flex flex-col items-center space-y-5'>
            <span className='text-2xl underline'>Change your Email</span>
            <div className="grid  gap-1.5">
           <Label htmlFor="message-2">Enter New Email</Label>
           <div className="grid items-center justify-center space-y-5">
             <Input
              type='email'
               value={email}
               onChange={(e) => setEmail(e.target.value.trim())}
               placeholder="Current password"
               className="rounded-full hover:border-teal-500 border-1 w-75 border-teal-500"
               required
             />
             <Button onClick={handleEmail} disabled={!validateEmail(email) || isLoading} className="w-full  bg-teal-400 hover:bg-teal-400">
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
           </div>
           
         </div>
          </div>
        ):(
          <div className='w-full  flex flex-col items-center space-y-5'>
            <span className='text-2xl underline'>Change your Email</span>
            <div className="grid  gap-1.5">
           <Label htmlFor="message-2">Enter OTP</Label>
           <div className="grid items-center justify-center space-y-5">
            <Input
              maxLength={6}
              value={otp}
              onChange={(e) => setOTP(e.target.value.trim())}
              placeholder="Current password"
              className="rounded-full hover:border-teal-500 border-1 border-teal-500"
              required
            />
             <Button onClick={updateEmail} className="w-full  bg-teal-400 hover:bg-teal-400">
                Reset
             </Button>
           </div>
           
         </div>
          </div>
        )
       }
    </div>
    <Footer />
  </div>
  )
}

export default ChangeEmail
