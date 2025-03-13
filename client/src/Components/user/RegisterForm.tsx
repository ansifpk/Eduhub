import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";

const FormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(2, {
        message: "This field is required.",
      })
      .email({
        message: "Invalid email format.",
      }),
    name: z.string().trim().min(2, {
      message: "This field is required.",
    }),
    password: z
      .string()
      .trim()
      .min(8, {
        message: "Enter a strong password.",
      })
      .max(20, {
        message: "Password is too strong.",
      }),
    conPassword: z.string().trim().min(1, {
      message: "This field is required.",
    }),
  })
  .refine((data) => data.conPassword == data.password, {
    message: "password and confirm password is not match.",
    path: ["conPassword"],
  });

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {doRequest,errors} = useRequest()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      conPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    doRequest({
      url:userRoutes.signUp,
      method:"post",
      body:{email: data.email, password: data.password,name: data.name,},
      onSuccess:(res)=>{
   
        setLoading(false);
        navigate(`/users/otp/${data.email}`);

        return;
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
      </Form>
    </>
  );
};

export default RegisterForm;
