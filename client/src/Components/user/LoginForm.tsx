import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";

const FormSchema = z.object({
  email: z.string().trim().min(1, {
    message: "This field is required.",
  }),
  password: z.string().trim().min(1, {
    message: "This field is required.",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {doRequest,errors} = useRequest()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
   await doRequest({
      url:userRoutes.login,
      method:"post",
      body:{ email: data.email, password: data.password },
      onSuccess:(res)=>{
        
        dispatch(setUser(res.user));
        navigate("/")
      }
    })
    
  };
  useEffect(()=>{
    setLoading(false);
     errors?.map((err)=>toast.error(err.message))
  },[errors])
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
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
            disabled={loading}
            className="bg-teal-400 text-white px-4 py-2   rounded-full hover:bg-[#4ca99f] transition-colors"
          >
            {loading ? (
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
    </>
  );
};

export default LoginForm;
