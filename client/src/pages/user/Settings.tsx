import { User } from "../../@types/userType";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProfileNavbar from "../../components/Header/ProfileNavbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setSchowConfirmPassword] = useState(false);
  const [error, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
    success: true,
  });
  const {doRequest,errors} = useRequest();
  const userId = useSelector((state: User) => state.id);
  const handlePassword = async () => {

      if (password.length < 8 || password.length > 20) {
        setErrors((prev) => ({
          ...prev,
          password: "password length in between 8-20",
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }
      if (newPassword.length < 8 || newPassword.length > 20) {
        setErrors((prev) => ({
          ...prev,
          newPassword: "password length in between 8-20",
        }));
        return;
      } else if (newPassword == password) {
        setErrors((prev) => ({
          ...prev,
          newPassword: "old passward and new passworld not be same",
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          newPassword: "",
        }));
      }
      if (newPassword !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "confirm password and ne wpassword is not same",
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }

      if (error.success) {
       await doRequest({
          url:`${userRoutes.resetPassword}/${userId}`,
          body:{password,newPassword},
          method:"patch",
          onSuccess:()=>{
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
            return toast.success("successfully reseted your password");
          }
        })
        // const response = await resetPassword(userId, password, newPassword);
      
        // if (response.success) {
         
        // } else {
        //   if (
        //     response.response.data.message == "Current password is not matching"
        //   ) {
        //     setErrors((prev) => ({
        //       ...prev,
        //       password: "Current password is not matching",
             
        //     }));

        //     return toast.error(response.response.data.message);
        //   } else if (response.response.data.message == "User Not Found") {
        //     return toast.error(response.response.data.message);
        //   }
        // }
      }
  };
  console.log("erro",errors);
  
  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message));
  },[errors]);

  return (
    <div className="bg-blue-50 h-screen">
      <Header />
      <ProfileNavbar />
      <main className="w-full flex justify-center  gap-10 py-8">
        <div className="grid w-75 gap-1.5">
          <h3>Reset your password</h3>
          <div className="grid  gap-1.5">
            <Label htmlFor="message-2">Enter your current password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                placeholder="Current password"
                className="rounded-full hover:border-teal-500 border-1 border-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                 
                  <i className="bi bi-eye-slash-fill"></i>
                  
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </button>
            </div>
            {error.password && (
              <div className="text-sm text-red-500">
                {error.password}
              </div>
            )}
          </div>
          <div className="grid  gap-1.5">
            <Label htmlFor="message-2">Enter your New password</Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value.trim())}
                className="rounded-full hover:border-teal-500 border-1 border-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                   <i className="bi bi-eye-slash-fill"></i>
                 
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </button>
            </div>
            {error.newPassword && (
              <div className="text-sm text-red-500 ">
                {error.newPassword}
              </div>
            )}
          </div>
          <div className="grid  gap-1.5">
            <Label htmlFor="message-2">Confirm your New password</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                className="rounded-full hover:border-teal-500 border-1 border-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setSchowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </button>
            </div>
            {error.confirmPassword && (
              <div className="text-sm text-red-500">
                {error.confirmPassword}
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
                    onClick={handlePassword}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
