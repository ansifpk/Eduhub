import React, { useEffect, useState } from 'react';
import { AlertCircle, Check, Eye, EyeOff, Loader2, } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRequest from '../../hooks/useRequest';
import userRoutes from '../../service/endPoints/userEndPoints';

interface changePassword {
  email: React.Dispatch<React.SetStateAction<any>>;
}

const NewPassword:React.FC<changePassword> = ({email}) => {
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(false);
  const navigate = useNavigate();
  const {doRequest,errors} = useRequest()
 

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if(password.length<8 || password.length>20 ){
      return setError(" Password must be in Between 8 - 20 charector ");
    }

    setIsLoading(true);
    setError(null);
      doRequest({
        url:userRoutes.newPassword,
        body:{email,password},
        method:"post",
        onSuccess:()=>{
          toast.success("Forget Password Success")
          setIsLoading(false);
          setSuccess(true)
        }
      })  
  };

   useEffect(()=>{
    setIsLoading(false);
      errors?.map((err)=>toast.error(err.message))
   },[errors]);

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert>
              <Check className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Your password has been successfully reset. You can now login with your new password.
              </AlertDescription>
            </Alert>
            <Button
              className="mt-4 w-full bg-teal-400 hover:bg-teal-600"
              onClick={() => navigate('/')}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Please enter your new password below<br />
            Note:* Password must be in Between 8 - 20 charector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e)=>setNewPassword(e.target.value.trim())}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value.trim())}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
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
              disabled={isLoading }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPassword;