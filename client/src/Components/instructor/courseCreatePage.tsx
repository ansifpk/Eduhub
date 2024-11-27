import React, { useEffect, useRef, useState } from "react";

// import toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import { error } from "console";
import { createCourse } from "@/Api/instructor";
import { Value } from "@radix-ui/react-select";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import InstructorAside from "./InstructorAside";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface Title {
  Title: string;
  Category: string;
  categories: any;
}
interface IUser {
  id: string;
}
interface ICategory {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  topics: string[];
  isListed: boolean;
}
const formSchema = z.object({
  coursetitle: z
    .string()
    .min(2, {
      message: "title must be at least 2 characters.",
    })
    .max(60, {
      message: "title must be lesthan 60 characters.",
    }),
  thumbnail: z
    .string()
    .min(5, {
      message: "thumbnail must be at least 5 characters.",
    })
    .max(60, {
      message: "title must be lesthan 60 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "discription must be at least 10 characters.",
    })
    .max(120, {
      message: "title must be lesthan 120 characters.",
    }),
  category: z
    .string()
    .min(4, {
      message: "category must be at least 5 characters.",
    })
    .max(120, {
      message: "title must be lesthan 120 characters.",
    }),
  subcategory: z.string().min(1, {
    message: "At least choose one sub Category.",
  }),
  levels: z.string().min(1, {
    message: "At least choose one level.",
  }),
  courseprice: z.number(),
  courseVideo: z.array(z.instanceof(File)).min(2, {
    message: "At least one video is required.",
  }),
  courseImage: z.instanceof(File, {
    message: "A thumbnile image is required.",
  }),
});

const CourseCreatePage: React.FC<Title> = ({ Title, Category, categories }) => {
  const [select, setSelect] = useState("Carriculum");
  const [category, setCategory] = useState(Category);
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDiscription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [topics, setTopics] = useState([]);
  const [price, setPrice] = useState(0);
  const [video, setVideo] = useState<File[]>([]);
  const [image, setImage] = useState<File | undefined>();
  const [previeImage, setPreview] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [title, setTitle] = useState(Title);
  const instructorId = useSelector((state: IUser) => state.id);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coursetitle: title,
      category: Category,
      subcategory: subCategory,
      levels: level,
      description: description,
      thumbnail: thumbnail,
      courseprice: price,
      courseVideo: video,
      courseImage: image,
    },
  });

  useEffect(() => {
    const topic = async () => {
      const selectedCategory = categories.find(
        (value: ICategory) => value.title === category
      );
      if (selectedCategory) {
        setTopics(selectedCategory.topics);
      } else {
        setTopics([]);
      }
    };
    topic();
    if (Object.keys(form.formState.errors).length > 0) {
      // console.log(form.formState.errors);
      toast.error("Please provide all the details");
    }
  }, [category, categories, form.formState.errors]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await createCourse({
      title,
      video,
      image,
      category,
      subCategory,
      level,
      price,
      description,
      thumbnail,
      instructorId,
    });
    if (response.success) {
      toast.success("Course Created SuccessFully..");
      setLoading(false);
      return navigate("/instructor/courses");
    } else {
      toast.error(response.response.data.message);
    }
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

  const [videoPreview, setVideoPreview] = useState('');
  const videoInputRef = useRef(null);
  const [videosArray,setVideosArray] = useState([]);
  const [preview, setvidPreview] = useState<string[]>([]);
  const handleVideoChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if(target.files&& target.files.length > 0){
      const file = target.files[0];
      if (file && file.type.startsWith("video/")) {
        const fileURL = URL.createObjectURL(file);
        setVideoPreview(fileURL);
      }
    }
  };

  const handleClearVideo = () => {
    setVideoPreview('');
    if ( videoInputRef && videoInputRef.current) {
      // videoInputRef.current.value = "";
    }
  };

   const handleVideo = (e:React.ChangeEvent<HTMLInputElement>) => {
       const target = e.target as HTMLInputElement;
       if(target.files&&target.files.length>0){
         console.log(target.files[0],"ji");
         const fileURL = URL.createObjectURL(target.files[0]);
         setvidPreview((prev)=>[...prev,fileURL])
       }
       
   }
  
   

  return (
    <div className="bg-black ">
      <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Edu Hub
          </h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <InstructorAside />
          <div className="flex-1 lg:max-w-full ">
            <div className="space-y-6">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-4 w-full h-60 flex justify-center p-4">
                    <Card className="w-full bg-black">
                      <CardHeader>
                        <div className="text-xl font-bold text-white">
                          Create your course
                        </div>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          onValueChange={(value) => {
                            setSelect(value);
                          }}
                          defaultValue="Carriculum"
                        >
                          <div className="flex items-center  space-x-2">
                            <RadioGroupItem
                              className="border-white"
                              value="Carriculum"
                              id="r1"
                            />
                            <Label className="text-white" htmlFor="r1">
                              Carriculum
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              className="border-white"
                              value="Course landing page"
                              id="r2"
                            />
                            <Label className="text-white" htmlFor="r2">
                              Course landing page
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              className="border-white "
                              value="Pricing"
                              id="r3"
                            />
                            <Label className="text-white" htmlFor="r3">
                              Pricing
                            </Label>
                          </div>
                          <div className="flex  justify-end space-x-2">
                            <Button
                              className="bg-white text-black"
                              onClick={() => navigate(-1)}
                            >
                              Cancell
                            </Button>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="col-8 flex   justify-center p-4">
                    <Form {...form}>
                      <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                      >
                        {select === "Carriculum" ? (
                          <Card className="bg-black">
                            <CardHeader>
                              <div className="text-xl font-bold text-white">
                                Upload course Videos
                              </div>
                              <CardDescription className="text-white">
                                Your course image and videos are very importent
                                on Your Success on Eduhub.
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <FormField
                                  control={form.control}
                                  name="courseImage"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-white">
                                        course Image
                                      </FormLabel>
                                      <FormControl>
                                        <div>
                                          <img src={previeImage} alt="" />
                                          <Input
                                            type="file"
                                            accept="image/*"
                                            name="courseImage"
                                            placeholder="course Image"
                                            onChange={(e) => {
                                              if (e.target.files) {
                                                previewFile(e);
                                                if (e.target.files[0]) {
                                                  const val = e.target.files[0];
                                                  setImage(val);
                                                  form.setValue(
                                                    "courseImage",
                                                    val
                                                  );
                                                }
                                              }
                                            }}
                                          />
                                        </div>
                                      </FormControl>
                                      <FormDescription>
                                        {form.formState.errors.courseImage ? (
                                          <FormLabel className="text-danger">
                                            {
                                              form.formState.errors.courseImage
                                                .message
                                            }
                                          </FormLabel>
                                        ) : (
                                          "This is your public display Image thumbnail."
                                        )}
                                      </FormDescription>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                {/* <div >
                                <Label>video</Label>
                                  {videoPreview && (
                                    <div className="mt-4">
                                      <video
                                        src={videoPreview}
                                        controls
                                        className="w-full rounded"
                                      >
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                      <button
                                        onClick={handleClearVideo}
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                      >
                                        Clear Video
                                      </button>
                                      <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    ref={videoInputRef}
                                    className="mt-4 block w-full"
                                  />
                                    </div>
                                    
                                  )}
                                 
                                </div> */}
                                {preview.length>0?(
                                <>
                                  {preview.map((val)=>(
                                    <div className="mt-4">
                                    <video
                                      src={val}
                                      controls
                                      className="w-full rounded"
                                    >
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                    <button
                                      onClick={handleClearVideo}
                                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                    >
                                      Clear Video
                                    </button>
                                    <input
                                  type="file"
                                  accept="video/*"
                                  onChange={handleVideoChange}
                                  ref={videoInputRef}
                                  className="mt-4 block w-full"
                                />
                                  </div>
                                  
                                  ))}
                                </>
                                )
                                :
                                (
                                <>
                                
                                </>
                                )
                                
                                }
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideo}
                                    ref={videoInputRef}
                                    className="mt-4 block w-full"
                                  />
                              </div>
                            </CardContent>
                          </Card>
                        ) : select === "Course landing page" ? (
                          <Card className="bg-black">
                            <CardHeader>
                              <div className="text-xl font-bold text-white">
                                Course landing page
                              </div>
                              <CardDescription className="text-white">
                                Your course landing page is very importent on
                                Your Success on Eduhub.People will search and
                                explore your course based on this informations
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <FormField
                                control={form.control}
                                name="coursetitle"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">
                                      Title
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        required
                                        placeholder="Enter your Title for this course"
                                        value={title}
                                        onChange={(e) => {
                                          setTitle(e.target.value);
                                          form.setValue(
                                            "coursetitle",
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      {form.formState.errors.coursetitle ? (
                                        <FormLabel className="text-danger">
                                          {
                                            form.formState.errors.coursetitle
                                              .message
                                          }
                                        </FormLabel>
                                      ) : (
                                        "This is your public display Title."
                                      )}
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-3 gap-1">
                                <FormField
                                  control={form.control}
                                  name="category"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-white">
                                        Category
                                      </FormLabel>
                                      <FormControl>
                                        <Select
                                          value={category}
                                          onValueChange={(value) => {
                                            setCategory(value);
                                            setSubCategory("");
                                            form.setValue("subcategory", "");
                                          }}
                                        >
                                          <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
                                            <SelectValue placeholder="Select..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              {categories.length > 0 ? (
                                                <>
                                                  {categories.map(
                                                    (value: ICategory) => (
                                                      <SelectItem
                                                        key={value._id}
                                                        value={`${value.title}`}
                                                      >
                                                        {value.title}
                                                      </SelectItem>
                                                    )
                                                  )}
                                                </>
                                              ) : (
                                                <>No Category Found</>
                                              )}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormDescription>
                                        {form.formState.errors.category ? (
                                          <FormLabel className="text-danger">
                                            {
                                              form.formState.errors.category
                                                .message
                                            }
                                          </FormLabel>
                                        ) : (
                                          "This is your public display Category."
                                        )}
                                      </FormDescription>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="subcategory"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-white">
                                        Sub Category
                                      </FormLabel>
                                      <FormControl>
                                        <Select
                                          value={subCategory}
                                          onValueChange={(value) => {
                                            setSubCategory(value);
                                            form.setValue("subcategory", value);
                                          }}
                                        >
                                          <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
                                            <SelectValue placeholder="Select..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              {topics.length > 0 ? (
                                                <>
                                                  {topics.map(
                                                    (value, index) => (
                                                      <SelectItem
                                                        key={index}
                                                        value={value}
                                                      >
                                                        {value}
                                                      </SelectItem>
                                                    )
                                                  )}
                                                </>
                                              ) : (
                                                <>No Subcategory Found</>
                                              )}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormDescription>
                                        {form.formState.errors.subcategory ? (
                                          <FormLabel className="text-danger">
                                            {
                                              form.formState.errors.subcategory
                                                .message
                                            }
                                          </FormLabel>
                                        ) : (
                                          "This is your public display Sub Category."
                                        )}
                                      </FormDescription>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="levels"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-white">
                                        Level
                                      </FormLabel>
                                      <FormControl>
                                        <Select
                                          value={level}
                                          onValueChange={(value) => {
                                            setLevel(value);
                                            form.setValue("levels", value);
                                          }}
                                        >
                                          <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
                                            <SelectValue placeholder="Select..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="All">
                                                All
                                              </SelectItem>
                                              <SelectItem value="Beginner">
                                                Beginner
                                              </SelectItem>
                                              <SelectItem value="Intermediat">
                                                Intermediat
                                              </SelectItem>
                                              <SelectItem value="Advance">
                                                Advance
                                              </SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormDescription>
                                        {form.formState.errors.levels ? (
                                          <FormLabel className="text-danger">
                                            {
                                              form.formState.errors.levels
                                                .message
                                            }
                                          </FormLabel>
                                        ) : (
                                          "This is your public display level."
                                        )}
                                      </FormDescription>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">
                                      Thumbnail
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        required
                                        placeholder="Enter your Thumbnail for this course"
                                        value={thumbnail}
                                        onChange={(e) => {
                                          setThumbnail(e.target.value);
                                          form.setValue(
                                            "thumbnail",
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      {form.formState.errors.thumbnail ? (
                                        <FormLabel className="text-danger">
                                          {
                                            form.formState.errors.thumbnail
                                              .message
                                          }
                                        </FormLabel>
                                      ) : (
                                        "This is your public display Title."
                                      )}
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">
                                      Description
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        required
                                        placeholder="Enter your Discription for this course"
                                        value={description}
                                        onChange={(e) => {
                                          setDiscription(e.target.value);
                                          form.setValue(
                                            "description",
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      {form.formState.errors.description ? (
                                        <FormLabel className="text-danger">
                                          {
                                            form.formState.errors.description
                                              .message
                                          }
                                        </FormLabel>
                                      ) : (
                                        "This is your public display Title."
                                      )}
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        ) : (
                          <Card className="bg-black">
                            <CardHeader>
                              <div className="text-xl font-bold text-white">
                                Add Pricing
                              </div>
                              <CardDescription>
                                Please Add an Apropier Price for your
                                course.Users Can buy your course for this price
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <FormField
                                control={form.control}
                                name="courseprice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">
                                      Price
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        required
                                        placeholder="Enter your price for this course"
                                        min={50}
                                        max={7999}
                                        maxLength={4}
                                        value={price}
                                        onChange={(e) => {
                                          setPrice(parseInt(e.target.value));
                                          form.setValue(
                                            "courseprice",
                                            parseInt(e.target.value)
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      <span>
                                        This is your public display Price.And
                                        the Price should be in betwee RS: 50 -
                                        Rs: 7999
                                      </span>
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        )}
                        <Button
                          type="submit"
                          className="bg-white text-black"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              creating....
                            </>
                          ) : (
                            <>Create</>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreatePage;
