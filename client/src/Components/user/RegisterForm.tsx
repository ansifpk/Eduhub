import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// import { LoginFormInputs, regis } from "../../utils/scheemas/registerSchema";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Button } from "../ui/button";
// import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Input } from "../ui/input";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";
import { RegisterFormInputs, registerSchema } from "../../utils/scheemas/registerSchema";
import Button from "../Button";

// const FormSchema = z
//   .object({
//     email: z
//       .string()
//       .trim()
//       .min(2, {
//         message: "This field is required.",
//       })
//       .email({
//         message: "Invalid email format.",
//       }),
//     name: z.string().trim().min(2, {
//       message: "This field is required.",
//     }),
//     password: z
//       .string()
//       .trim()
//       .min(8, {
//         message: "Enter a strong password.",
//       })
//       .max(20, {
//         message: "Password is too strong.",
//       }),
//     conPassword: z.string().trim().min(1, {
//       message: "This field is required.",
//     }),
//   })
//   .refine((data) => data.conPassword == data.password, {
//     message: "password and confirm password is not match.",
//     path: ["conPassword"],
//   });

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {doRequest,err} = useRequest();
  const {
      register,
      handleSubmit,
      formState: {errors },
  } = useForm<RegisterFormInputs>({
      resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data:RegisterFormInputs ) => {
    setLoading(true);
    // doRequest({
    //   url:userRoutes.signUp,
    //   method:"post",
    //   body:{email: data.email, password: data.password,name: data.name,},
    //   onSuccess:()=>{
    //     setLoading(false);
    //     navigate(`/users/otp/${data.email}`);
    //     return;
    //   }
    // })
  };

  useEffect(()=>{
    setLoading(false);
    err?.map((err)=>toast.error(err.message))
  },[err])
  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-2  grid justify-center items-center w-full">
               <div className="grid w-75 " >
                  <label htmlFor="email">Email</label>
                  <input type="text"  {...register("email")}  placeholder="Enter Email" className="border border-teal-500  rounded-full py-2 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
               </div>
               <div className="grid w-75 " >
                  <label htmlFor="email">Name</label>
                  <input type="text"  {...register("name")}  placeholder="Enter Email" className="border border-teal-500  rounded-full py-2 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
               </div>
               <div className="grid w-75 " >
                  <label htmlFor="email">Mobile</label>
                  <input type="number"  {...register("mobile")}  placeholder="Enter Email" className="border border-teal-500  rounded-full py-2 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
               </div>
               <div className="relative w-75">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
                <input
                  id="password"
                  type={show?"text": "password"}
                  placeholder="Enter Password"
                   {...register("password")}
                  className="border form-control w-full rounded-full py-2 px-4 pr-10 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={()=>setShow(!show)}
                  className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <i className={`bi ${show?" bi-eye-slash-fill":"bi bi-eye-fill"}  relative z-50`}></i>
                </button>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
               <p className="text-xs text-end cursor-pointer">Forget Pasword?</p>
                <div className="flex justify-between items-center">
                  {loading?
                   <button className={"text-xs bg-teal-400 rounded-full px-5 py-2 gap-2 text-white flex"}>
                      <span>Loging...</span>                  
                      <div className="spinner-border spinner-border-sm me-2 animate-spin" role="status">                  
                        <i className="bi bi-arrow-repeat animate-spin"></i>                     
                      </div>
                    </button>
                  :
                  <Button  type="submit"  className={"text-xs bg-teal-400 rounded-full px-10 py-2 text-white"} text={"Register"}  />
                  }
               </div>
            </form>
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full border-1 border-teal-400"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full border-1 border-teal-400"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full border-1 border-teal-400"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="conPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full border-1 border-teal-400"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-teal-400 text-white px-4 py-2   rounded-full hover:bg-[#4ca99f] transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP
              </>
            ) : (
              <>
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form> */}
    </>
  );
};

export default RegisterForm;
