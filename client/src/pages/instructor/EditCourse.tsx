import type { ICategory } from "@/@types/categoryType";
import AppSidebar from "../../components/AppSidebar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import useRequest from "@/hooks/useRequest";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import {
  courseSchema,
  type CourseFormInputs,
} from "@/util/schemas/courseScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const EditCourse = () => {
  const [select, setSelect] = useState("Course landing page");
  const [loading, setLoading] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [previeImage, setPreview] = useState("");
  const [content, setContent] = useState("");
  const { doRequest, err } = useRequest();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormInputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      level: "",
      thumbnail: "",
      description: "",
      price: "",
      image: {
        _id: "1",
        image_url: "",
      },
      sections: {
        sections: [
          {
            sectionTitle: "",
            lectures: [
              {
                duration: "",
                content: {
                  _id: "1",
                  video_url: "",
                },
              },
            ],
          },
        ],
      },
    },
  });

  useEffect(() => {
    doRequest({
      url: `${instructorRoutes.courseDeatiles}/${courseId}`,
      body: {},
      method: "get",
      onSuccess: (res) => {
        setValue("title", res.course.title);
        setValue("price", `${res.course.price}`);
        setValue("category", res.course.category);
        setValue("subCategory", res.course.subCategory);
        setValue("level", res.course.level);
        setValue("thumbnail", res.course.thumbnail);
        setValue("description", res.course.description);
        setValue("sections", res.course.sections);
        setValue("image.image_url", res.course.image.image_url);
        setPreview(res.course.image.image_url);
        doRequest({
          url: `${instructorRoutes.getCategoryies}`,
          body: {},
          method: "get",
          onSuccess: (res) => {
            setCategories(res);
            setTopics(
              res.find((cate: ICategory) => cate.title == watch("category"))
                .topics
            );
          },
        });
      },
    });
  }, []);

  const handleEditCourse = (data: CourseFormInputs) => {
    // console.log("whiweiw",data);
    // return;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("courseImage", data.image.image_url);
    formData.append("thumbnail", data.thumbnail);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("level", data.level);
    formData.append("price", data.price);
    formData.append("sections", JSON.stringify(data.sections));
    for (let i = 0; i < data.sections.sections.length; i++) {
      for (let j = 0; j < data.sections.sections[i].lectures.length; j++) {
        let video = data.sections.sections[i].lectures[j].content.video_url;
        if (typeof video !== "string") {
          formData.append(
            "courseVideo",
            video,
            `section${i}_lecture${j}_${video.name}`
          );
        }
      }
    }
    setLoading(true)
    doRequest({
      url: `${instructorRoutes.editCourse}/${courseId}`,
      body: formData,
      method: "patch",
      onSuccess: () => {
        navigate(-1)
        toast.success("Successfully Edited.");
        setLoading(false)
      },
    });
  };

  const previewFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      await setFileToBase(file);
    }
  };

  const setFileToBase = async (file: File): Promise<void> => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      previewFile(event);
      setValue("image.image_url", files[0]);
    }
  };
  const handleVideoFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionIdx: number,
    lectureIsx: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue(
        `sections.sections.${sectionIdx}.lectures.${lectureIsx}.content.video_url`,
        files[0]
      );
    }
  };
  const addSection = () => {
    const sections = watch("sections");
    sections?.sections?.push({
      sectionTitle: "",
      lectures: [
        {
          title: "",
          duration: "",
          content: {
            _id: "1",
            video_url: "",
          },
        },
      ],
    });
    setValue("sections", sections);
  };
  const deleteSection = (index: number) => {
    const sections = watch("sections");
    if (sections.sections.length == 1) {
      return toast.error("Add Atleast one section");
    }
    sections.sections.splice(index, 1);
    setValue("sections", sections);
  };

  useEffect(() => {
    setLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  // console.log("errors", errors);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <div className="p-2 space-y-2">
          <div className="w-full  flex gap-5">
            <div className="w-1/3 ">
              <Card className="w-full text-black">
                <CardHeader>
                  <div className="text-xl font-bold text-black">
                    Create your course
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    onValueChange={(value) => {
                      setSelect(value);
                    }}
                    defaultValue="Course landing page"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Course landing page" id="r2" />
                      <label className="text-black" htmlFor="r2">
                        Course landing page
                      </label>
                    </div>
                    <div className="flex items-center  space-x-2">
                      <RadioGroupItem value="Carriculum" id="r1" />
                      <label className="text-black" htmlFor="r1">
                        Carriculum
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Pricing" id="r3" />
                      <label className="text-black" htmlFor="r3">
                        Pricing
                      </label>
                    </div>
                    <div className="flex  justify-end space-x-2">
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-black cursor-pointer text-white rounded p-2 font-semibold hover:bg-white border hover:text-black hover:border-black">
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
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
            <div className="w-full">
              <form
                className="space-y-6 w-full"
                onSubmit={handleSubmit(handleEditCourse)}
              >
                {select === "Carriculum" ? (
                  <Card>
                    <CardHeader>
                      <div className="text-xl font-bold ">
                        Upload course Videos
                      </div>
                      <CardDescription className="text-black">
                        Your course image and videos are very importent on Your
                        Success on Eduhub.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="courseImage">Course Image</label>
                        {previeImage && (
                          <img
                            className="w-full h-48"
                            src={previeImage}
                            alt="preview image"
                          />
                        )}
                        <input
                          className="border border-black rounded p-2"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {errors.image && (
                          <p className="text-red-500">{errors.image.message}</p>
                        )}
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <label className=" my-2">videos Section</label>
                        {watch("sections.sections")?.map((_, ind) => (
                          <div
                            key={ind}
                            className="border-2 rounded p-2 space-y-5"
                          >
                            <div className="flex flex-col space-y-2">
                              <label
                                htmlFor="sectionTitle"
                                className="font-bold"
                              >
                                Section {ind + 1} Title
                              </label>
                              <div className="flex items-center-safe w-full gap-2">
                                <input
                                  {...register(
                                    `sections.sections.${ind}.sectionTitle`
                                  )}
                                  type="text"
                                  placeholder="section title"
                                  className="border p-2 w-full rounded border-black"
                                />
                                <i
                                  className="bi bi-trash-fill cursor-pointer text-red-500"
                                  onClick={() => deleteSection(ind)}
                                ></i>
                              </div>
                              <p className="text-red-500">
                                {
                                  errors.sections?.sections?.[ind]?.sectionTitle
                                    ?.message
                                }
                              </p>
                            </div>
                            {watch(`sections.sections.${ind}.lectures`)?.map(
                              (_, index) => (
                                <div
                                  key={`${index + ind}`}
                                  className="flex flex-col space-y-2"
                                >
                                  <label
                                    htmlFor="sectionTitle"
                                    className="font-bold"
                                  >
                                    Lecture {index + 1} Title
                                  </label>
                                  <div className="flex items-center-safe w-full gap-2">
                                    <input
                                      type="text"
                                      {...register(
                                        `sections.sections.${ind}.lectures.${index}.title`
                                      )}
                                      placeholder="lecture title"
                                      className="border p-2 w-full rounded border-black"
                                    />
                                    <i
                                      className="bi bi-trash-fill cursor-pointer text-red-500"
                                      onClick={() => {
                                        const lectures = watch(
                                          `sections.sections.${ind}.lectures`
                                        );
                                        if(lectures.length == 1){
                                          return toast.error("Atleast one lecture is required");
                                        }
                                        lectures.splice(index, 1);
                                        setValue(
                                          `sections.sections.${ind}.lectures`,
                                          lectures
                                        );
                                      }}
                                    ></i>
                                  </div>
                                  <p className="text-red-500">
                                    {
                                      errors.sections?.sections?.[ind]
                                        ?.lectures?.[index]?.title?.message
                                    }
                                  </p>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-end-safe space-x-2">
                                      <div className="grid grid-cols-1 space-y-2">
                                        <label
                                          htmlFor="Content video"
                                          className="font-bold"
                                        >
                                          Content video
                                        </label>
                                        <input
                                          onChange={(e) =>
                                            handleVideoFileChange(e, ind, index)
                                          }
                                          type="file"
                                          accept="video/*"
                                          className="border rounded p-2 border-black"
                                        />
                                        {errors.sections?.sections?.[ind]
                                          ?.lectures?.[index]?.content
                                          ?.video_url && (
                                          <p className="text-red-500">
                                            {
                                              errors.sections?.sections?.[ind]
                                                ?.lectures?.[index]?.content
                                                ?.video_url?.message
                                            }
                                          </p>
                                        )}
                                      </div>
                                      <span
                                        onClick={()=>{
                                          if(watch(`sections.sections.${ind}.lectures.${index}.content.video_url`) && typeof watch(`sections.sections.${ind}.lectures.${index}.content.video_url`) == "string"){
                                             setContent(watch(`sections.sections.${ind}.lectures.${index}.content.video_url`) as string);
                                             setVideoOpen(true)
                                          }else if(watch(`sections.sections.${ind}.lectures.${index}.content.video_url`)){
                                            const videoURL = URL.createObjectURL(watch(`sections.sections.${ind}.lectures.${index}.content.video_url`) as File);
                                            setContent(videoURL);
                                            setVideoOpen(true)
                                          }
                                          
                                        }}
                                        className="bg-black text-white cursor-pointer p-2 rounded hover:bg-white hover:text-black font-semibold hover:border-black border"
                                      >
                                        view
                                      </span>
                                    </div>
                                    <div className="flex items-end-safe space-x-2">
                                      <div className="grid grid-cols-1 space-y-2">
                                        <label
                                          htmlFor="Duration"
                                          className="font-bold"
                                        >
                                          Duration
                                        </label>
                                        <input
                                          {...register(
                                            `sections.sections.${ind}.lectures.${index}.duration`
                                          )}
                                          type="text"
                                          placeholder="enter duration"
                                          className="border rounded p-2 border-black"
                                        />
                                        {errors.sections?.sections?.[ind]
                                          ?.lectures?.[index]?.duration && (
                                          <p className="text-red-500">
                                            {
                                              errors.sections?.sections?.[ind]
                                                ?.lectures?.[index]?.duration
                                                ?.message
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const lectures = watch(
                                  `sections.sections.${ind}.lectures`
                                );
                                lectures.push({
                                  title: "",
                                  duration: "",
                                  content: {
                                    _id: "1",
                                    video_url: "",
                                  },
                                });
                                setValue(
                                  `sections.sections.${ind}.lectures`,
                                  lectures
                                );
                              }}
                              className="bg-black p-2 border cursor-pointer rounded hover:bg-white text-white hover:text-black hover:border hover:border-black"
                            >
                              Add Lecture
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addSection}
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-black text-white p-2 rounded cursor-pointer border hover:bg-white hover:text-black hover:border-black"
                        >
                          <Plus size={20} /> Add New Section
                        </button>
                      </div>
                      <Dialog open={videoOpen} onOpenChange={()=>{
                        if(videoOpen){
                          setContent("")
                        }
                        setVideoOpen(!videoOpen)
                        }}>
                        <div>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle></DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <video width="640" height="360" controls>
                                {content&&<source src={content} type="video/mp4" />}
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            <DialogFooter>
                              <DialogClose onClick={()=>setContent("")} className="bg-black rounded text-white p-2 cursor-pointer">
                                Close
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </div>
                      </Dialog>
                    </CardContent>
                  </Card>
                ) : select === "Course landing page" ? (
                  <Card className="text-black">
                    <CardHeader>
                      <div className="text-xl font-bold ">
                        Course landing page
                      </div>
                      <CardDescription className="">
                        Your course landing page is very importent on Your
                        Success on Eduhub.People will search and explore your
                        course based on this informations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        <div className="flex flex-col space-y-3">
                          <label htmlFor="Title">Title</label>
                          <input
                            {...register("title")}
                            type="text"
                            placeholder="enter course title"
                            className="border border-black p-2 rounded"
                          />
                          {errors.title && (
                            <p className="text-red-500">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="flex flex-col space-y-3">
                            <label htmlFor="category">Category</label>
                            <select
                              id="category"
                              {...register("category")}
                              onChange={(value) =>
                                categories.find(
                                  (cat) =>
                                    cat.title == value.target.value &&
                                    setTopics(cat.topics)
                                )
                              }
                              className="p-2 border rounded border-black"
                            >
                              <option value="" disabled>
                                Select category
                              </option>
                              {categories.length > 0 ? (
                                <>
                                  {categories.map(
                                    (value: ICategory, indx: number) => (
                                      <option
                                        key={`${value} - ${indx}`}
                                        value={`${value.title}`}
                                      >
                                        {value.title}
                                      </option>
                                    )
                                  )}
                                </>
                              ) : (
                                <>No category Found</>
                              )}
                            </select>
                            {errors.category && (
                              <p className="text-red-500">
                                {errors.category.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col space-y-3">
                            <label htmlFor="subCategory">Topics</label>
                            <select
                              id="subCategory"
                              {...register("subCategory")}
                              onChange={(value) =>
                                categories.find(
                                  (cat) =>
                                    cat.title == value.target.value &&
                                    setTopics(cat.topics)
                                )
                              }
                              className="p-2 border rounded border-black"
                            >
                              <option value="" disabled>
                                Select topic
                              </option>
                              {topics.length > 0 ? (
                                <>
                                  {topics.map((value, indx: number) => (
                                    <option
                                      key={`${value} - ${indx}`}
                                      value={`${value}`}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </>
                              ) : (
                                <>No Topics Found</>
                              )}
                            </select>
                            {errors.subCategory && (
                              <p className="text-red-500">
                                {errors.subCategory.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col space-y-3">
                            <label htmlFor="level">Levels</label>
                            <select
                              id="level"
                              {...register("level")}
                              className="p-2 border rounded border-black"
                            >
                              <option value="" disabled>
                                Select level
                              </option>
                              <option value="All">All</option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediat">Intermediat</option>
                              <option value="Advance">Advance</option>
                            </select>
                            {errors.level && (
                              <p className="text-red-500">
                                {errors.level.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                          <label htmlFor="Thumbnail">Thumbnail</label>
                          <input
                            type="text"
                            {...register("thumbnail")}
                            className="border border-black p-2 rounded"
                            placeholder="Enter thumbnail"
                          />
                          {errors.thumbnail && (
                            <p className="text-red-500">
                              {errors.thumbnail.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col space-y-3">
                          <label htmlFor="Description">Description</label>
                          <input
                            type="text"
                            {...register("description")}
                            className="border border-black p-2 rounded"
                            placeholder="Enter description"
                          />
                          {errors.description && (
                            <p className="text-red-500">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="text-xl font-bold ">Add Pricing</div>
                      <CardDescription>
                        Please Add an Apropier Price for your course.Users Can
                        buy your course for this price.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        {...register("price")}
                        placeholder="enter price"
                        className="p-2 border border-black rounded"
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </CardContent>
                  </Card>
                )}

                <AlertDialog>
                  <AlertDialogTrigger
                    disabled={loading}
                    className="bg-black cursor-pointer text-white rounded p-2 font-semibold hover:bg-white border hover:text-black hover:border-black"
                  >
                    {loading ? (
                      <div className="flex gap-1 items-center-safe">
                        Loading....
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      <>Save</>
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will save all the datas you entered below to our
                        EduHub servers.
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
                        onClick={() => handleSubmit(handleEditCourse)()}
                      >
                        Continue
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(EditCourse);
