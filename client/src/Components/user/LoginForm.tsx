
import Button from "../Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import userRoutes from "../../service/endPoints/userEndPoints";
import useRequest from "../../hooks/useRequest";
import { LoginFormInputs, loginSchema } from "../../utils/scheemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {doRequest,err} = useRequest();
  const {
    register,
    handleSubmit,
    formState: {errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async(data:LoginFormInputs ) => {
    console.log("Form Data:", data);
    setLoading(true)
     await doRequest({
      url:userRoutes.login,
      method:"post",
      body:{ email: data.email, password: data.password },
      onSuccess:(res)=>{
        setLoading(false)
        navigate("/home")
        dispatch(setUser(res.user));
      }
    })
  };

  useEffect(()=>{
    setLoading(false);
    console.log(err);
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
             <button className={"text-xs bg-teal-400  rounded-full px-5 py-2 gap-2 text-white flex"}>
                <span>Loging...</span>                  
                <div className="spinner-border spinner-border-sm me-2 animate-spin" role="status">                  
                  <i className="bi bi-arrow-repeat animate-spin"></i>                     
                </div>
              </button>
            :
            <Button  type="submit"   className={"text-xs bg-teal-400 rounded-full px-10 py-2 text-white"} text={"Login"}  />
            }
         </div>
      </form>
    </>
  );
};

export default LoginForm;
