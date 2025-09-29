import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import useRequest from "@/hooks/useRequest";
import { useNavigate, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testSchema, type TestFormInputs } from "@/util/schemas/testScheema";
import { Loader2Icon } from "lucide-react";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const InstructorAddTest = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormInputs>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      questions: Array.from({ length: 5 }, () => ({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      })),
    },
  });

  const { courseId } = useParams();
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleQuestions = (data: TestFormInputs) => {
    setLoading(true);
    doRequest({
      url: `${instructorRoutes.tests}/${courseId}`,
      body: { testData: data },
      method: "post",
      onSuccess: () => {
        setLoading(false);
        navigate("/instructor/courses");
        return toast.success(`Successfully added the Test`);
      },
    });
  };

  useEffect(() => {
    setLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <div className="p-2 space-y-2">
          <div className=" flex flex-col items-center w-full">
            <div className=" text-center text-sm text-black ">
              <div className="font-extrabold text-3xl underline">Add Test</div>
              Slide {current} of {count}
            </div>
            <Carousel setApi={setApi} className="w-[75%] h-[430px] ">
              <CarouselContent>
                {watch("questions").map((_value, index) => (
                  <CarouselItem key={index}>
                    <Card className=" text-black">
                      <CardContent>
                        <strong>Question {index + 1}</strong>
                        <form
                          className="space-y-3"
                          onSubmit={handleSubmit(handleQuestions)}
                        >
                          <div>
                            <textarea
                              {...register(`questions.${index}.question`)}
                              className="border border-black w-full rounded h-40 p-2"
                              placeholder="Enter question"
                            />
                            <span className="text-red-500 text-sm">
                              {errors.questions?.[index]?.question?.message}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <input
                                {...register(`questions.${index}.option1`)}
                                type="text"
                                placeholder="option 1"
                                className="border border-black rounded p-2 w-full"
                              />
                              <span className="text-red-500 text-sm">
                                {errors.questions?.[index]?.option1?.message}
                              </span>
                            </div>
                            <div>
                              <input
                                {...register(`questions.${index}.option2`)}
                                type="text"
                                placeholder="option 2"
                                className="border border-black rounded w-full p-2"
                              />
                              <span className="text-red-500 text-sm">
                                {errors.questions?.[index]?.option2?.message}
                              </span>
                            </div>
                            <div>
                              <input
                                {...register(`questions.${index}.option3`)}
                                type="text"
                                placeholder="option 3"
                                className="border border-black w-full rounded p-2"
                              />
                              <span className="text-red-500 text-sm">
                                {errors.questions?.[index]?.option3?.message}
                              </span>
                            </div>
                            <div>
                              <input
                                {...register(`questions.${index}.option4`)}
                                type="text"
                                placeholder="option 4"
                                className="border border-black w-full rounded p-2"
                              />
                              <span className="text-red-500 text-sm">
                                {errors.questions?.[index]?.option4?.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <input
                              type="text"
                              {...register(`questions.${index}.answer`)}
                              className="border border-black p-2 w-full rounded"
                              placeholder="Enter answer"
                            />
                            <span className="text-red-500 text-sm">
                              {errors.questions?.[index]?.answer?.message}
                            </span>
                          </div>
                          <div className="flex justify-center-safe gap-4">
                            <AlertDialog>
                              <AlertDialogTrigger className="bg-black cursor-pointer text-white rounded p-2">
                                Cancell
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will discard all the datas you entered
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    className="bg-black cursor-pointer text-white"
                                    type="button"
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogCancel
                                    className="bg-black cursor-pointer text-white"
                                    type="submit"
                                    onClick={() => navigate(-1)}
                                  >
                                    Continue
                                  </AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            {index == 4 && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button
                                    type="button"
                                    className="bg-black text-white rounded p-2 font-semibold"
                                    disabled={loading}
                                  >
                                    {loading ? (
                                      <span className="flex items-center-safe">
                                        Loading...
                                        <Loader2Icon className="animate-spin size-4" />{" "}
                                      </span>
                                    ) : (
                                      "Submit"
                                    )}
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will hide this course from the users
                                      of Eduhub
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      className="bg-black-600 cursor-pointer text-white"
                                      type="button"
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogCancel
                                      className="bg-black-600 cursor-pointer text-white"
                                      type="submit"
                                      onClick={() =>
                                        handleSubmit(handleQuestions)()
                                      }
                                    >
                                      Continue
                                    </AlertDialogCancel>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(InstructorAddTest);
