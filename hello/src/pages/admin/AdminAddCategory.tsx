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
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import {
  categorySchema,
  type CategoryFormInputs,
} from "@/util/schemas/categoryScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminAddCategory = () => {
  const [loading, setLoaidng] = useState(false);
  const topicRef = useRef<HTMLInputElement>(null);
  const { doRequest, err } = useRequest();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      topics: [],
    },
  });
  console.log("errors", errors);
  const handleTopic = async () => {
    const topics = watch("topics");
    if (topicRef.current!.value.length == 0) {
      return;
    }
    if (topics.includes(topicRef.current!.value)) {
      return toast.error("This topic already includes");
    }
    if (topics.length < 8) {
      topics.push(topicRef.current!.value);
      topicRef.current!.value = "";
      setValue("topics", topics);
      toast.success("sub Category added");
    } else {
      toast.error("maximum limite exceeded");
    }
  };

  const handleDeleteTopic = (index: number) => {
    let topics = watch("topics");
    topics = topics.filter((_value, i) => i !== index);
    setValue("topics", topics);
    toast.success("sub Category removed");
  };

  const handleCreate = (data: CategoryFormInputs) => {
    setLoaidng(true);
    doRequest({
      url: adminRoutes.addCategory,
      method: "post",
      body: {
        title: data.title,
        description: data.description,
        topics: data.topics,
      },
      onSuccess: () => {
        setLoaidng(false);
        toast.success(" Category added");
        return navigate("/admin/category");
      },
    });
  };

  useEffect(() => {
    setLoaidng(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>
        <div>
          <div className="flex justify-between my-3 ">
            <span className="text-lg font-bold underline">
              Create Categories
            </span>
          </div>
          <div className="grid flex-1 auto-rows-min gap-6 px-4  mx-5">
            <Card>
              <CardContent>
                <form className="grid grid-cols-2 space-x-5">
                  <div className="space-y-5">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="title">Title</label>
                      <input
                        {...register("title")}
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        className="px-2 py-1 rounded-md border border-purple-500"
                      />
                      {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="description">Discription</label>
                      <textarea
                        {...register("description")}
                        id="description"
                        placeholder="Enter Discription"
                        className="p-2 rounded-md h-30 border border-purple-500"
                      />
                      {errors.description && (
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="space-y-5">
                      <div className="flex flex-col w-full space-y-2">
                        <label htmlFor="topics">Topics</label>

                        <div className="w-full space-x-5">
                          <input
                            id="topics"
                            type="text"
                            ref={topicRef}
                            placeholder="Enter title"
                            className="px-2 py-1 w-[80%] rounded-md border border-purple-500"
                          />
                          <button
                            type="button"
                            onClick={handleTopic}
                            className="bg-purple-500 px-2 py-1 rounded text-white font-semibold cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                        {errors.topics && (
                          <p className="text-red-500">
                            {errors.topics.message}
                          </p>
                        )}
                        <ScrollArea className="border rounded-md border-purple-500 h-50">
                          <div className="p-4">
                            <h4 className="mb-4 text-sm  leading-none font-medium">
                              Topics
                            </h4>
                            {watch("topics").map((topic, index) => (
                              <div key={topic + index}>
                                <div className="flex justify-between text-sm">
                                  <span>{topic}</span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => handleDeleteTopic(index)}
                                  >
                                    X
                                  </span>
                                </div>
                                <Separator className="my-2" />
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                      <div className="flex flex-col space-y-2"></div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="my-3">
              <div className="flex gap-5 justify-end-safe w-full">
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    className="bg-purple-600 px-2 py-1 cursor-pointer rounded text-white font-bold"
                  >
                    {loading ? (
                      <span className="flex items-center-safe">
                        loading..
                        <Loader2Icon className="animate-spin size-4" />
                      </span>
                    ) : (
                      <span> Save changes</span>
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will save the changes to our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-purple-600 cursor-pointer px-2 py-1 rounded text-white font-bold">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-purple-600 hover:bg-white hover:text-black cursor-pointer px-2 py-1 rounded text-white font-bold"
                        onClick={() =>
                          handleSubmit((data) => handleCreate(data))()
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <div>
                  <button className="bg-purple-600 cursor-pointer px-2 py-1 rounded text-white font-bold">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminAddCategory);
