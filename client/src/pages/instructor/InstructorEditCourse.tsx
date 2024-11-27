import React, { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/Components/ui/card";
import InstructorAsside from "@/Components/instructor/InstructorAside";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import toast from "react-hot-toast";
import {
  createCourse,
  editCourse,
  getCategoryies,
  getCourses,
} from "@/Api/instructor";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "inspector";
import { Separator } from "@/Components/ui/separator";
import InstructorAside from "@/Components/instructor/InstructorAside";

interface Course {
  _id: string;
  title: string;
  instructorId?: string;
  subCategory: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  isListed: boolean;
  price: number;
  test?: [];
  subscription: boolean;
  videos: string[];
  image: string;
  imageUrl?: string;
  videoUrl: string[];
  createdAt: string;
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
  courseprice: z.number(),
});

const InstructorEditcourse: React.FC = () => {
  const [select, setSelect] = useState("Carriculum");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [course, setCourse] = useState<Course>();
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [video, setVideo] = useState<File[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [image, setImage] = useState<File | string>("");
  const [previewImg, setPreviewImg] = useState("");
  const [addVideo, setAddVideo] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setError] = useState({
    title: false,
    thumbnail: false,
    description: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseprice: price,
      // courseVideo:video,
      // courseImage:image,
    },
  });

  const _id = useSelector((state: IUser) => state.id);
  const { courseId } = useParams();

  useEffect(() => {
    const topic = async () => {
      const res = await getCourses(_id);
      const categories = await getCategoryies();
      setCategories(categories);

      const data: Course = res.find((value: Course) => value._id == courseId);
      if (data) {
        setLevel(data.level);
        setPreviewImg(data.imageUrl!);
        setCourse(data);
        setTitle(data.title);
        setCategory(data.category);
        setSubCategory(data.subCategory);
        setThumbnail(data.thumbnail);
        setDiscription(data.description);
        setPrice(data.price);
        setVideoUrls(data.videoUrl);
        const top = categories.find(
          (val: ICategory) => val.title === data.category
        );
        if (top) {
          setTopics(top.topics);
        }

        const videoFiles = await Promise.all(
          data.videos!.map(async (video: string, index: number) => {
            const response = await fetch(video, { mode: "no-cors" });
            const blob = await response.blob();
            return new File([blob], video, { type: "video/mp4" });
          })
        );
        const response = await fetch(data.image, { mode: "no-cors" });
        const blob = await response.blob();
        const img = new File([blob], data.image, { type: "image/png" });
        //  console.log("idg",img);
        setImage(img);
        setVideo(videoFiles);
        //  setAddVideo(data.videos);
      }
    };
    topic();
  }, []);

  const setFileToBase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewImg(reader.result);
        //  setImage(file)
      }
    };
  };
  const previewFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      setFileToBase(file);
    }
  };

  const removeVideo = (index: number) => {
    if (video.length == 1) {
      return toast.error("Atleast one video is required");
    }
    const urls = videoUrls.filter((val, i) => i !== index);
    toast.success("Video Removed SuccesFully..");
    const vid = video.filter((val, i) => i !== index);
    setVideoUrls(urls);
    setVideo(vid);
  };

  const handleAdd = () => {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (video.length == 0) {
      return toast.error("upload atleast one video");
    }
    let arr = [...video, ...addVideo];
    //  setVideo(arr)
    if (title.length <= 2) {
      setError((prev) => ({
        ...prev,
        title: true,
      }));
      return toast.error("Please provide all Deatailes...");
    }
    if (thumbnail.length <= 9) {
      setError((prev) => ({
        ...prev,
        thumbnail: true,
      }));
      return toast.error("Please provide all Deatailes...");
    }
    if (description.length <= 9) {
      setError((prev) => ({
        ...prev,
        description: true,
      }));
      return toast.error("Please provide all Deatailes...");
    }
    setLoading(true);
    const response = await editCourse({
      _id: course!._id,
      title,
      thumbnail,
      description,
      category,
      subCategory,
      level,
      price,
      image,
      video: arr,
    });
    // console.log(response,"succ");

    if (response.success) {
      setLoading(false);
      toast.success("Course Updated Successfully");
      return navigate("/instructor/courses");
    } else {
      toast.error(response.response.data.message);
    }
  };

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
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        {select === "Carriculum" ? (
                          <Card className="bg-black text-white">
                            <CardHeader>
                              <div className="text-xl font-bold">
                                Add video for course
                              </div>
                              <CardDescription>
                                Please Add vodeos for your course.
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label className="m-3">
                                  Add Image for your course
                                </Label>
                                <img src={previewImg} alt="" />
                                <Input
                                  type="file"
                                  name="courseImage"
                                  accept="image/*"
                                  onChange={(e) => {
                                    previewFile(e);
                                    if (e.target.files) {
                                      if (e.target.files[0]) {
                                        const val = e.target.files[0];
                                        setImage(val);
                                        setPreviewImg(val.name);
                                      }
                                    }
                                  }}
                                />
                              </div>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label className="m-3">
                                  Add videos for your course
                                </Label>
                                {video.length > 0 ? (
                                  <>
                                    {videoUrls.map((videos, index) => (
                                      <div key={index}>
                                        {/* <Label>Choose video</Label> */}
                                        <div className="flex">
                                          {/* <iframe 
                                                          src={videos}
                                                            allowFullScreen>
                                                       </iframe> */}
                                          <video controls>
                                            <source
                                              src={videos}
                                              type="video/mp4"
                                            />
                                            <source
                                              src={videos}
                                              type="video/webm"
                                            />
                                            <source
                                              src={videos}
                                              type="video/ogg"
                                            />
                                          </video>
                                          <Button 
                                           className="bg-white text-black"
                                            type="button"
                                            onClick={() => removeVideo(index)}
                                          >
                                            remove
                                          </Button>
                                        </div>
                                        <Input
                                          type="file"
                                          accept="video/*"
                                          name="courseVideo"
                                          placeholder="course Video"
                                          onChange={(e) => {
                                            if (e.target.files) {
                                              let array = [...video];
                                              array[index] = e.target.files[0];
                                              setVideo(array);
                                            }
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    <Input
                                      type="file"
                                      accept="video/*"
                                      name="courseVideo"
                                      placeholder="course Video"
                                      onChange={(e) => {
                                        if (e.target.files) {
                                          let array = [];
                                          array.push(e.target.files[0]);
                                          setVideo(array);
                                        }
                                      }}
                                    />
                                  </>
                                )}
                                {addVideo.length > 0 ? (
                                  <>
                                    {addVideo.map((val, index) => (
                                      <Input
                                        key={index}
                                        type="file"
                                        accept="video/*"
                                        name="courseVideo"
                                        placeholder="course Video"
                                      />
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Label className="m-3">Add More Videos</Label>
                                <Input
                                  type="file"
                                  accept="video/*"
                                  name="courseVideo"
                                  placeholder="course Video"
                                  onChange={(e) => {
                                    if (e.target.files) {
                                      let arr = [...addVideo];
                                      arr.push(e.target.files[0]);
                                      setAddVideo(arr);
                                    }
                                  }}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ) : select === "Course landing page" ? (
                          <Card className="bg-black">
                            <CardHeader>
                              <div className="text-xl font-bold text-white">
                                Edit course landing page
                              </div>
                              <CardDescription>
                                Your course landing page is very importent on
                                Your Success on Eduhub.People will search and
                                explore your course based on this informations
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Label className="m-3 text-white">
                                Enter Title for your course
                              </Label>
                              <Input
                                value={title}
                                minLength={3}
                                maxLength={60}
                                placeholder="Enter Title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                              />
                              <FormDescription>
                                {errors.title && (
                                  <div className="text-danger">
                                    Minimum length of the title should be 3..
                                  </div>
                                )}
                              </FormDescription>
                              <div className="grid grid-cols-3 gap-1">
                                <div>
                                  <Label className="m-3 text-white">Choose Category</Label>
                                  <Select
                                    value={category}
                                    onValueChange={(value) => {
                                      setCategory(value);
                                      setSubCategory("");

                                      const selectedCategory = categories.find(
                                        (cat: ICategory) => cat.title === value
                                      );
                                      if (selectedCategory) {
                                        const data: ICategory =
                                          selectedCategory;
                                        setTopics(data.topics);
                                      } else {
                                        setTopics([]);
                                      }
                                    }}
                                  >
                                    <SelectTrigger className="w-100 rounded-full border-1 border-blue-900 ">
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
                                          <>NO Categories Available</>
                                        )}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="m-3 text-white">
                                    Choose SubCategory
                                  </Label>
                                  <Select
                                    value={subCategory}
                                    onValueChange={(value) => {
                                      setSubCategory(value);
                                    }}
                                  >
                                    <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
                                      <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {topics.length > 0 ? (
                                          <>
                                            {topics.map((val, index) => (
                                              <SelectItem
                                                key={index}
                                                value={val}
                                              >
                                                {val}
                                              </SelectItem>
                                            ))}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="m-3 text-white">Choose Level</Label>
                                  <Select
                                    value={level}
                                    onValueChange={(value) => setLevel(value)}
                                  >
                                    <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
                                      <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="Beginner">
                                          Beginner
                                        </SelectItem>
                                        <SelectItem value="Intermediat">
                                          Intermediat
                                        </SelectItem>
                                        <SelectItem value="Advanced">
                                          Advanced
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <Label className="m-3 text-white">
                                Enter Thumbnail for your course
                              </Label>
                              <Input
                                type="string"
                                value={thumbnail}
                                minLength={10}
                                maxLength={100}
                                onChange={(e) => setThumbnail(e.target.value)}
                                required
                              />
                              <FormDescription>
                                {errors.thumbnail && (
                                  <div className="text-danger">
                                    Minimum length of the Thumbnail should be
                                    10..
                                  </div>
                                )}
                              </FormDescription>
                              <Label className="m-3 text-white">
                                Enter Description for your course
                              </Label>
                              <Input
                                type="string"
                                value={description}
                                minLength={10}
                                maxLength={500}
                                placeholder="Enter Description for your Course"
                                onChange={(e) => setDiscription(e.target.value)}
                                required
                              />
                              <FormDescription>
                                {errors.description && (
                                  <div className="text-danger">
                                    Minimum length of the Desciption should be
                                    10..
                                  </div>
                                )}
                              </FormDescription>
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
                                    <FormLabel className="text-white">Price</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        defaultValue={price}
                                        required
                                        placeholder="Enter your price for this course"
                                        min={50}
                                        max={7999}
                                        maxLength={4}
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

export default InstructorEditcourse;

//     <div className="container-fluid bg-blue-200">
//     <div className="row">
//         <InstructorAsside/>
//         <div className="col-md-10">
//           <div className="row">
//               <div className="col-4 w-full h-60 flex justify-center p-4">
//                 <Card className="w-full">
//                     <CardHeader >
//                      <div className="text-xl font-bold">Create your course</div>
//                     </CardHeader>
//                     <CardContent>
//                     <RadioGroup onValueChange={(value) =>{setSelect(value)}} defaultValue="Carriculum">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Carriculum" id="r1" />
//                           <Label htmlFor="r1">Carriculum</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Course landing page" id="r2" />
//                           <Label htmlFor="r2">Course landing page</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Pricing" id="r3" />
//                           <Label htmlFor="r3">Pricing</Label>
//                         </div>
//                         <div className="flex justify-end space-x-2">

//                           <Button onClick={()=>navigate(-1)}>Cancell</Button>
//                         </div>
//                      </RadioGroup>
//                      </CardContent>
//                 </Card>
//               </div>
//               <div className="col-8 flex   justify-center p-4">
//                 <Form {...form}>
//                   <form className="space-y-6 w-full" onSubmit={handleSubmit} encType="multipart/form-data">
//                 {select === "Carriculum"?(
//                      <Card>
//                         <CardHeader >
//                           <div className="text-xl font-bold">Add video for course</div>
//                           <CardDescription>Please Add vodeos for your course.</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                 <div className="grid w-full max-w-sm items-center gap-1.5">
//                    <Label className="m-3">Add Image for your course</Label>
//                    <img src={previewImg} alt="" />
//                    <Input  type="file" name="courseImage" accept="image/*"onChange={(e)=>{
//                              previewFile(e)
//                              if(e.target.files){
//                                 if(e.target.files[0]){
//                                   const val = e.target.files[0]
//                                   setImage(val);
//                                   setPreviewImg(val.name);
//                                 }
//                               }
//                           }} />
//                 </div>
//                 <div className="grid w-full max-w-sm items-center gap-1.5">
//                 <Label className="m-3">Add videos for your course</Label>
//                          {video.length>0?(<>
//                           {videoUrls.map((videos,index)=>(
//                               <div key={index}>
//                                 {/* <Label>Choose video</Label> */}
//                                <div className="flex">
//                                 {/* <iframe
//                                     src={videos}
//                                     allowFullScreen>
//                                 </iframe> */}
//                                 <video controls>
//                                   <source  src={videos} type="video/mp4"/>
//                                   <source  src={videos} type="video/webm"/>
//                                   <source  src={videos} type="video/ogg"/>
//                                 </video>
//                                   <Button type="button" onClick={()=>removeVideo(index)}>remove</Button>
//                                </div>
//                                <Input type="file"  accept="video/*" name="courseVideo"  placeholder="course Video"  onChange={(e)=>{
//                                 if(e.target.files){
//                                   let array = [...video]
//                                   // console.log(array,"arr",e.target.files[0]);

//                                   array[index] = e.target.files[0];
//                                   setVideo(array);
//                                   }
//                           }} />
//                               </div>
//                             ))}
//                          </>):(
//                           <>

//                            <Input type="file"  accept="video/*" name="courseVideo"  placeholder="course Video"  onChange={(e)=>{
//                                 if(e.target.files){
//                                   let array = []
//                                   array.push(e.target.files[0]);
//                                   setVideo(array);
//                                   }
//                           }} />
//                           </>
//                          )}
//                           {addVideo.length>0?(<>
//                             {addVideo.map((val,index)=>(
//                               <Input key={index} type="file" accept="video/*" name="courseVideo"  placeholder="course Video" />
//                             ))}
//                           </>):
//                           (<>
//                           </>)}
//                           <Label className="m-3">Add More Videos</Label>
//                           <Input type="file" accept="video/*" name="courseVideo"  placeholder="course Video"  onChange={(e)=>{
//                             if(e.target.files){
//                               let arr=[...addVideo]
//                               arr.push(e.target.files[0])
//                               setAddVideo(arr);
//                             }
//                           }} />
//                 </div>
//                         </CardContent>
//                       </Card>

//                 ):select === "Course landing page"?(
//      <Card >
//      <CardHeader >
//      <div className="text-xl font-bold">Upload course Videos</div>
//      <CardDescription>Your course landing page is very importent on Your Success on Eduhub.People will search and explore your course based on this informations</CardDescription>
//      </CardHeader>
//      <CardContent>

//             {/* <FormField
//               control={form.control}
//               name="coursetitle"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input defaultValue={title} required placeholder="Enter your Title for this course" onChange={(e) => {
//                     setTitle(e.target.value)
//                     form.setValue("coursetitle",e.target.value);
//                   }}  />
//                   </FormControl>
//                   <FormDescription>
//                      {form.formState.errors.coursetitle? (
//                         <FormLabel className="text-danger">{form.formState.errors.coursetitle.message}</FormLabel>
//                       ) : (
//                       "This is your public display Title."
//                       )}
//                   </FormDescription>
//                 </FormItem>
//               )}
//             /> */}
//             <Label className="m-3">Enter Title for your course</Label>
//             <Input value={title} minLength={3} maxLength={60}  placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} required />
//             <FormDescription>
//                {errors.title&&<div className="text-danger">Minimum length of the title should be 3..</div>}
//             </FormDescription>
//            <div className="grid grid-cols-3 gap-1">
//               <div>
//               <Label className="m-3">Choose Category</Label>
//               <Select value={category}  onValueChange={(value) => {

//              setCategory(value);
//              setSubCategory("");

//              const selectedCategory = categories.find((cat: ICategory) => cat.title === value);
//              if (selectedCategory) {
//                 const data:ICategory = selectedCategory
//                 setTopics(data.topics);
//              } else {
//                setTopics([]);
//              }
//            }} >
//                    <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
//                      <SelectValue placeholder="Select..." />
//                    </SelectTrigger>
//                    <SelectContent>
//                      <SelectGroup>
//                        {categories.length>0?(
//                          <>
//                          {categories.map((value: ICategory) => (
//                            <SelectItem key={value._id} value={`${value.title}`}>
//                              {value.title}
//                            </SelectItem>
//                          ))}
//                        </>
//                        ):(
//                          <>
//                            NO Categories Available
//                          </>
//                        )}

//                      </SelectGroup>

//                    </SelectContent>
//                  </Select>
//               </div>
//               <div>
//               <Label className="m-3">Choose SubCategory</Label>
//               <Select value={subCategory} onValueChange={(value)=>{
//                 setSubCategory(value)
//               }}>
//                    <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
//                      <SelectValue placeholder="Select..." />
//                    </SelectTrigger>
//                    <SelectContent>
//                      <SelectGroup>
//                         {topics.length>0?(<>
//                           {topics.map((val,index)=>(
//                              <SelectItem key={index} value={val}>{val}</SelectItem>
//                           ))}
//                         </>):(<>

//                         </>)}
//                      </SelectGroup>

//                    </SelectContent>
//                  </Select>
//               </div>
//               <div>
//                   <Label className="m-3">Choose Level</Label>
//                   <Select
//                     value={level}
//                     onValueChange={(value) => setLevel(value)}
//                   >
//                     <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
//                       <SelectValue placeholder="Select..." />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="Beginner">Beginner</SelectItem>
//                         <SelectItem value="Intermediat">Intermediat</SelectItem>
//                         <SelectItem value="Advanced">Advanced</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//            </div>
//              <Label className="m-3">Enter Thumbnail for your course</Label>
//              <Input type="string" value={thumbnail} minLength={10} maxLength={100} onChange={(e) => setThumbnail(e.target.value)} required/>
//              <FormDescription>
//                {errors.thumbnail&&<div className="text-danger">Minimum length of the Thumbnail should be 10..</div>}
//              </FormDescription>
//              <Label className="m-3">Enter Description for your course</Label>
//              <Input type="string" value={description} minLength={10} maxLength={500} placeholder="Enter Description for your Course"  onChange={(e) => setDiscription(e.target.value)}required />
//              <FormDescription>
//                {errors.description&&<div className="text-danger">Minimum length of the Desciption should be 10..</div>}
//             </FormDescription>
//     </CardContent>
//  </Card>
//                 ):(
//     <Card >
//     <CardHeader >
//     <div className="text-xl font-bold">Add Pricing</div>
//     <CardDescription>Please Add an Apropier Price for your course.Users Can buy your course for this price</CardDescription>
//     </CardHeader>
//     <CardContent>

//       <FormField
//         control={form.control}
//         name="courseprice"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Price</FormLabel>
//             <FormControl>
//               <Input type="number" defaultValue={price} required placeholder="Enter your price for this course" min={50} max={7999} maxLength={4}  onChange={(e) => {
//                     setPrice(parseInt(e.target.value))
//                     form.setValue("courseprice",parseInt(e.target.value));
//                   }} />
//             </FormControl>
//             <FormDescription >

//                        <span>This is your public display Price.And the Price should be in betwee RS: 50 - Rs: 7999</span>

//                   </FormDescription>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//     </CardContent>
// </Card>
//                 )}
//                 <Button type="submit" >
//               {isLoading?(
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Editing....
//                  </>
//                 ):(
//                   <>
//                     Edit
//                   </>
//                 )}
//             </Button>
//                </form>
//                 </Form>
//               </div>
//           </div>
//         </div>
//     </div>
// </div>
