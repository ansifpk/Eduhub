import type { IUser } from "@/@types/userType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import ProfileNavbar from "@/components/user/ProfileNavbar";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import {
  resetPasswordScheema,
  type ResetPasswordFormInputs,
} from "@/util/schemas/resetPasswordScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordScheema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleEdit = (data: ResetPasswordFormInputs) => {
    doRequest({
      url: `${userRoutes.resetPassword}/${userId}`,
      body: {
        password: data.currentPassword,
        newPassword: data.newPassword,
        conPassword: data.confirmPassword,
      },
      method: "patch",
      onSuccess: () => {
        setValue("confirmPassword", "");
        setValue("currentPassword", "");
        setValue("newPassword", "");
        return toast.success("successfully reseted your password");
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div>
      <Header />
      <div className="w-full">
        <ProfileNavbar value="Settings" />
        <main className="w-full flex justify-center items-center md:p-8 p-2">
          <form
            onSubmit={handleSubmit(handleEdit)}
            className="flex flex-col justify-center items-center space-y-5 w-[80%] "
          >
            <h3>Reset your password</h3>
            <div className="grid space-y-2 ">
              <label htmlFor="currentPassword" className="text-xs">
                Enter Your Current Password
              </label>
              <div className="relative">
                <input
                  {...register("currentPassword")}
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  className="border rounded-full py-1 px-2  border-teal-400"
                  placeholder="current password"
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
              {errors.currentPassword && (
                <p className="text-red-500 text-xs">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="grid space-y-2">
              <label htmlFor="newPassword" className="text-xs">
                Enter Your New Password
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  className="border rounded-full py-1 px-2  border-teal-400"
                  placeholder="current password"
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
              {errors.newPassword && (
                <p className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="grid space-y-2">
              <label htmlFor="confirmPassword" className="text-xs">
                Confirm Your New Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="border rounded-full py-1 px-2  border-teal-400"
                  placeholder="current password"
                />
                <button
                  type="button"
                  onClick={() => setShowConPassword(!showConPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConPassword ? (
                    <i className="bi bi-eye-slash-fill"></i>
                  ) : (
                    <i className="bi bi-eye-fill"></i>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <AlertDialog>
              <AlertDialogTrigger
                type="button"
                className={`m-2 cursor-pointer  py-2 px-4 text-white rounded font-semibold text-xs bg-teal-500 hover:bg-teal-300`}
              >
                Save
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently save
                    this information to our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-white bg-teal-500 hover:bg-teal-300 hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleSubmit(handleEdit)()}
                    className="bg-teal-500 hover:bg-teal-300"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Settings);
