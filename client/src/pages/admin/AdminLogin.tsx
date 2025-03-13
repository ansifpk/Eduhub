import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"
import { User } from "@/@types/userType"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import {setAdmin} from "@/redux/authSlice";
import { Input } from "@/Components/ui/input";
import { Loader2,ArrowRight } from "lucide-react";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import { Button } from "@/Components/ui/button";


const FormSchema = z.object({
  email: z.string().trim().min(1, {
    message: "This field is required.",
  }),
  password: z.string().trim().min(1, {
    message: "This field is required.",
  }),
});


const AdminLogin = () => {
    const [isLoading,setLoading] = useState(false)
    const navigate = useNavigate();
    const id = useSelector((state:User)=>state.isAdmin);
    const dispatch = useDispatch();
    const {doRequest,errors} = useRequest();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

    useEffect(()=>{
      if(id){
       return navigate('/admin/home')
      }
    },[id]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      setLoading(true);
      doRequest({
        url:adminRoutes.login,
        method:"post",
        body:{ email: data.email, password: data.password },
        onSuccess:(res)=>{
          setLoading(false)
          dispatch(setAdmin(res.admin));
          navigate("/admin/home")
        }
      })
    };

    useEffect(()=>{
      setLoading(false)
      errors?.map((err)=>toast.error(err.message))
    },[errors]);

    // const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
    //     e.preventDefault();
    //     const response = await adminLogin({email,password});
     
    //     if(response.admin){
    //       toast.success("Adming Login Successfull")
    //       dispatch(setAdmin(response.admin))
    //       return navigate("/admin/home")
    //     }else{
    //       toast.error(response.response.data.message)
    //     }
    // }
  return (
      // <div className="instructor-log">
      //     <div className="instructor-join" style={{background: 'white'}}>
      //     <h3>Admin Login</h3>
      //       <form onSubmit={handleSubmit}>
      //         <div>
      //           <label htmlFor="">Email</label>
      //           <input className="login-input" required type="text" value={email} onChange={(e) => setEmail(e.target.value.trim())}   placeholder="Enter name" />
      //         </div>
      //         <div>
      //           <label htmlFor="">Password</label>
      //           <input className="login-input" required  type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())}    placeholder="Enter password" />
      //         </div>
      //         <button className="button-join" >Login</button>
      //       </form>
      //   </div>
      // </div>
      
      <div className="h-screen flex justify-center items-center">
         
        <div className=" w-50 shadow-lg p-3">
          <div className="text-2xl font-semibold text-center text-teal-500 underline">
            Welcome Admin
          </div>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6 w-50 mx-auto"
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
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-teal-400 text-white px-4 py-2   rounded-full hover:bg-[#4ca99f] transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Login...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
         </Form>
        </div>

      </div>
  )
}

export default AdminLogin
