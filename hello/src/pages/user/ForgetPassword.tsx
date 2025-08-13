import ForgetPasswordEmail from "@/components/user/ForgetPasswordEmail";
import React, { useCallback, useState } from "react";
import VerifyOtp from "./verifyOtp";
import ForgetNewPassword from "./ForgetNewPassword";

const ForgetPassword= () => {
    const [page,setPage] = useState(1);
    const [email,setEmail] = useState("");

    const handlePage = useCallback((page:number)=>{
        setPage(page);
    },[setPage]);
    const handleEmail = useCallback((email:string)=>{
        setEmail(email);
    },[setEmail]);

    if(page == 1){
        return <ForgetPasswordEmail handlePage={handlePage}  handleEmail={handleEmail}  />
    }
    if(page == 2){
        return <VerifyOtp email={email} handlePage={handlePage} />
    }
    if(page == 3){
        return <ForgetNewPassword email={email} />
    }
};

export default React.memo(ForgetPassword);
