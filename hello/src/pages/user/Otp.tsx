import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import useRequest from "@/hooks/useRequest";
import { setUser } from "@/redux/authSlice";
import userRoutes from "@/service/endPoints/userEndPoints";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Otp = () => {
    const [ loading,setLoading] = useState(false);
    const [ otp,setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {doRequest,err} = useRequest();
   

  const onSubmit = async(e:FormEvent)=>{
    e.preventDefault()

    if(otp.length < 6){
       setLoading(false);
      return toast.error("Please Enter All 6 Disgits of The Otp")
    }

    setLoading(true);

    await doRequest({
      url:userRoutes.verifyOtp,
      method:"post",
      body:{ otp: otp },
      onSuccess:(res)=>{
        setLoading(false)
        dispatch(setUser(res.user.user))
        navigate('/')
      }
    })
    
  }

  useEffect(()=>{
      setLoading(false);
       err?.map((err)=>toast.error(err.message))
  },[err])

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-teal-500">Verify Your Email</CardTitle>
              <CardDescription>
                Enter your OTP that sent to your Email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} >
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3 items-center text-center justify-center">
                      <label htmlFor="email">OTP</label>
                        <InputOTP  onChange={(value)=>setOtp(value)}  maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                          <InputOTPGroup >
                            <InputOTPSlot className="border border-teal-400 rounded" index={0} />
                            <InputOTPSlot className="border border-teal-400 rounded" index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot className="border border-teal-400 rounded" index={2} />
                            <InputOTPSlot className="border border-teal-400 rounded" index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot className="border border-teal-400 rounded" index={4} />
                            <InputOTPSlot className="border border-teal-400 rounded" index={5} />
                          </InputOTPGroup>
                       </InputOTP>
                      <Button type="submit" disabled={loading} className="w-full bg-teal-500 hover:bg-teal-300 text-white">
                       {
                          loading?<>
                          Verifying...
                          <i className="bi bi-arrow-repeat animate-spin"></i>
                          </>
                          :
                          "Verify"

                      }
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // <div className="flex  items-center justify-center min-h-svh">
    //   <div>
    //     <CardHeader>
    //       <CardTitle>Verify Email</CardTitle>
    //       <CardDescription>
    //         Enter your OTP that sent to your Email address.
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form>
    //         <div className="space-y-4">
    //           <div className="space-y-2">
    //             <input
    //               type="text"
    //               placeholder="Enter your OTP"
    //               // value={otp}
    //               maxLength={6}
    //               // onChange={(e) => setOtp(e.target.value)}
    //               className="w-full"
    //               required
    //             />
    //           </div>
    //           <p>
    //             Time Remaining:{" "}
    //             {/* <span style={{ color: "black", fontWeight: 600 }}>
    //               {minutes! < 10 ? `0${minutes}` : minutes}:
    //               {second! < 10 ? `0${second}` : second}
    //             </span> */}
    //           </p>

    //           <Button
    //             type="button"
    //             className="w-full"
    //             // disabled={second > 0 || minutes > 0}
    //             // onClick={resentOTP}
    //           >
    //             Resent OTP
    //             {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
    //           </Button>
    //           <Button
    //             type="submit"
    //             className="w-full"
    //             // disabled={loading || otp.length <= 0}
    //           >
    //             Verifiying OTP
    //             {/* {loading ? (
    //               <>
    //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //                 Verifiying OTP
    //               </>
    //             ) : (
    //               <>
    //                 Verify
    //                 <ArrowRight className="ml-2 h-4 w-4" />
    //               </>
    //             )} */}
    //           </Button>

    //           <div className="text-center">
    //             <p
    //               // onClick={() => navigate("/users/login")}
    //               className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
    //             >
    //               Back to Login
    //             </p>
    //           </div>
    //         </div>
    //       </form>
    //     </CardContent>
    //   </div>
    // </div>
  );
};

export default Otp;
