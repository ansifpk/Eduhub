import  { useState } from 'react';
import { Card } from '../ui/card';
import ForgetPassOtp from './ForgetPassOtp';
import ForgetPassEmail from './ForgetPassEmail';
import NewPassword from './changePassword';



const ForgotPassword = () => {

  const [success, setSuccess] = useState<boolean | null>(false);
  const [change, setChange] = useState<boolean | null>(false);
  const [email, setEmail] = useState<any>('');
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
      {success?(
        change?(
           <NewPassword email={email}/>
        ):(
          <ForgetPassOtp sucessCheckOTP={setChange} email={email}  />
        )
      ):(
        <ForgetPassEmail successCheckEmail={setSuccess} setEmailProp={setEmail}/>
      )}
      </Card>
    </div>
  );
};

export default ForgotPassword;