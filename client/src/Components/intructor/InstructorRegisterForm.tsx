import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import std from "../../assets/home-page/teacher-home.jpg";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  registerInstructorSchema,
  type RegisterInstructorFormInputs,
} from "@/util/schemas/instructorRegisterScheema";
import { Loader2Icon } from "lucide-react";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";

const InstructorRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterInstructorFormInputs>({
    resolver: zodResolver(registerInstructorSchema),
    defaultValues: {
      cv: {
        id: "1",
        cv_url: "",
      },
      certificate: {
        id: "1",
        certificate_url: "",
      },
    },
  });
  const onSubmit = async (data: RegisterInstructorFormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);

    const img1 = data.certificate.certificate_url as File;
    const img2 = data.cv.cv_url as File;
    formData.append("certificate_url", img1.name);
    formData.append("cv", img2.name);
    if (data.certificate.certificate_url instanceof File) {
      const newCertificate = data.certificate.certificate_url;
      formData.append("certificateImage", newCertificate);
    }

    if (data.cv.cv_url instanceof File) {
      const newCv = data.cv.cv_url;
      formData.append("cvImage", newCv);
    }
    setLoading(true);
    doRequest({
      url: instructorRoutes.register,
      method: "patch",
      body: formData,
      onSuccess: () => {
        setLoading(false);
        toast.success(`successfully applyed
      we sent an email after review your informations.`);
        return navigate("/instructor");
      },
    });
  };
  useEffect(() => {
    setLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);
  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              id="image"
              src={std}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col ">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-teal-400">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-balance">
                  Register to become an instructor in EduHub
                </p>
              </div>
              <Tabs defaultValue="Register" className="flex items-center">
                <TabsList className="bg-teal-500">
                  <TabsTrigger value="Login">
                    <NavLink to={"/instructor/login"}>Login</NavLink>
                  </TabsTrigger>
                  <TabsTrigger value="Register">
                    <NavLink to={"/instructor/register"}>Register</NavLink>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <div className="grid gap-1">
                  <label
                    htmlFor="email"
                    className={`text-sm font-medium text-gray-700 ${
                      errors.email && "text-red-500"
                    }`}
                  >
                    {errors.email ? errors.email.message : "Email"}
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="text"
                    placeholder="please enter your email"
                    className="border py-1 rounded-full px-2 border-teal-300"
                  />
                </div>

                <div className="grid gap-1">
                  <label
                    htmlFor="qualification"
                    className={`text-sm font-medium text-gray-700 ${
                      errors.email && "text-red-500"
                    }`}
                  >
                    {errors.qualification
                      ? errors.qualification.message
                      : "Qualification"}
                  </label>
                  <input
                    {...register("qualification")}
                    id="qualification"
                    type="text"
                    placeholder="please enter your qualification"
                    className="border py-1 rounded-full px-2 border-teal-300"
                  />
                </div>

                <div className="space-y-2 flex flex-col ">
                  <label
                    className={`text-sm font-medium text-gray-700 ${
                      errors.experience && "text-red-500"
                    }`}
                  >
                    {errors.experience
                      ? errors.experience.message
                      : " What kind of teaching have you done before?"}
                  </label>
                  <Select onValueChange={(e) => setValue("experience", e)}>
                    <SelectTrigger className="w-full rounded-full border border-teal-300">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="In person, Informally">
                          In person, Informally
                        </SelectItem>
                        <SelectItem value="In person, Profesionally">
                          In person, Profesionally
                        </SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                  <label
                    htmlFor="certificate"
                    className={`text-sm font-medium text-gray-700 ${
                      errors?.certificate?.certificate_url && "text-red-500"
                    }`}
                  >
                    {errors?.certificate?.certificate_url
                      ? errors?.certificate?.certificate_url?.message
                      : "Upload Certificate"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setValue("certificate.id", "1");
                      setValue(
                        "certificate.certificate_url",
                        e?.target?.files![0]
                      );
                    }}
                    className="border py-1 rounded-full px-2 border-teal-300"
                  />
                </div>
                <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                  <label
                    htmlFor="CV"
                    className={`text-sm font-medium text-gray-700 ${
                      errors?.cv?.cv_url && "text-red-500"
                    }`}
                  >
                    {errors?.cv?.cv_url
                      ? errors?.cv?.cv_url?.message
                      : "Upload CV"}
                  </label>
                  <input
                    onChange={(e) => {
                      setValue("cv.cv_url", e?.target?.files![0]);
                      setValue("cv.id", "1");
                    }}
                    type="file"
                    accept="image/*"
                    className={`rounded-full border py-1 px-2 border-teal-300`}
                    id="cv"
                    placeholder="cv"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full bg-teal-500 py-1 flex  justify-center-safe font-bold text-white rounded hover:bg-teal-300  ${
                    loading ? "" : "cursor-pointer"
                  }`}
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <>
                      Loading...
                      <Loader2Icon className="animate-spin" />
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default React.memo(InstructorRegisterForm);
