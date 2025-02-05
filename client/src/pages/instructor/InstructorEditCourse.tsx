import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
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
  editCourse,
  getCategoryies,
  getCourses,
} from "@/Api/instructor";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp, Loader2, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/Components/ui/separator";
import InstructorAside from "@/Components/instructor/InstructorAside";
import { ICourse } from "@/@types/courseType";
import { ISection } from "@/@types/sectionType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

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
  const [course, setCourse] = useState<ICourse>();
  const [select, setSelect] = useState("Carriculum");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState({
    _id: "" as string,
    image_url: {} as File,
  });

  const [video, setVideo] = useState<File[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [previewImg, setPreviewImg] = useState("");
  const [addVideo, setAddVideo] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [errors, setError] = useState({
    title: false,
    thumbnail: false,
    description: false,
    price: false,
  });

  const [sections, setSections] = useState<ISection[]>([]);
  // console.log(sections,'hhgg');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseprice: price,
    },
  });

  const instructorId = useSelector((state: IUser) => state.id);

  const { courseId } = useParams();

  useEffect(() => {
    const cours = async () => {
      const cate = await getCategoryies();
      const data = await getCourses(instructorId);
      setCategories(cate);
      if (data.success) {
        const arr = data.courses.find(
          (value: ICourse) => value._id == courseId
        );
        if (arr) {
          setCourse(arr);
        }
        let a = cate.find((val: ICategory) => val.title == arr.category);

        setTitle(arr.title);
        setCategory(arr.category);
        setSubCategory(arr.subCategory);
        setTopics(a.topics);
        setLevel(arr.level);
        setThumbnail(arr.thumbnail);
        setDescription(arr.description);
        setPrice(arr.price);
        const file = new File([arr.image.image_url], arr.image.image_url, {
          type: "image/jpeg",
        });

        setImage({
          _id: arr.image._id,
          image_url: file,
        });
        setPreviewImg(arr.image.image_url);
        setSections(arr.sections);
        console.log(arr, "arr");
      } else {
        toast.error(data.response.data.message);
      }
    };
    cours();
  }, [courseId]);

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

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("hwlloo giuys");

    const formData = new FormData();

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
    if (price < 50) {
      setError((prev) => ({
        ...prev,
        price: true,
      }));
      return toast.error("Please provide all Deatailes...");
    }
    setError(() => ({
      title: false,
      thumbnail: false,
      description: false,
      price: false,
    }));
    setLoading(true);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("level", level);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);

    formData.append(
      "image",
      JSON.stringify({
        _id: image._id,
        image_url: image.image_url.name,
      })
    );

    if (course?.image.image_url !== image.image_url.name) {
      formData.append("courseImage", image.image_url);
    }
    formData.append("_id", courseId!);
    formData.append("price", price.toString());
    formData.append("sections", JSON.stringify(sections));
    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < sections[i].lectures.length; j++) {
        console.log(sections[i].lectures[j].content.video_url, "ij");

        if (typeof sections[i].lectures[j].content.video_url == "string") {
          console.log("string snn");

          const fileVid: File = new File(
            [sections[i].lectures[j].content.video_url as string],
            sections[i].lectures[j].content.video_url as string,
            {
              type: "video/mp4",
            }
          );
          // sections[i].lectures[j].content.video_url = fileVid
          formData.append(
            "courseVideo",
            fileVid,
            `section${i}_lecture${j}_${fileVid.name}`
          );
        } else {
          console.log("string alla");
          let data = sections[i].lectures[j].content.video_url as File;
          formData.append(
            "courseVideo",
            data,
            `section${i}_lecture${j}_${data.name}`
          );
        }
      }
    }
  
    const data = await editCourse(formData);
    

    if (data.success) {
      setLoading(false);
      toast.success("Course Updated Successfully");
      return navigate("/instructor/courses");
    } else {
      setLoading(false);
      toast.error(data.response.data.message);
    }
  };
  // console.log(sections);
  const updateSectionTitle = (sectionId: number, newTitle: string) => {
    setSections((prev) => {
      const update = [...prev];
      update[sectionId].sectionTitle = newTitle;
      return update;
    });
  };
  const updateLecture = (
    sectionIdx: number,
    lectureIdx: number,
    field: string,
    value: string | File
  ) => {
    setSections((prev) => {
      const update = [...prev];
      if (field == "title") {
        update[sectionIdx].lectures[lectureIdx][`${field}`] = value as string;
      } else if (field == "duration") {
        update[sectionIdx].lectures[lectureIdx][`${field}`] = value as string;
      } else {
        update[sectionIdx].lectures[lectureIdx].content.video_url =
          value as File;
      }
      return update;
    });
  };

  const deleteLecture = (sectionId: number, lectureId: number) => {
    setSections((prev) => {
      const update = [...prev];
      let a = update[sectionId].lectures.splice(lectureId, 1);
      console.log(update[sectionId].lectures, "ki");

      return update;
    });
  };

  const addLecture = (sectionId: number) => {
    setSections((prev) => {
      const update = [...prev];

      update[sectionId].lectures.push({
        content: {
          _id: update[sectionId].lectures.length.toString(),
          video_url: "",
        },
        id: "1",
        duration: "",
        title: "",
      });

      return update;
    });
  };

  const deleteSection = (sectionId: number) => {
    if (sections.length == 1) {
      return toast.error("Please upload atleast one section for yur course");
    }
    setSections(sections.filter((section, index) => index !== sectionId));
  };

  const addSection = () => {
    const objectId = new mongoose.Types.ObjectId();
    const idString = objectId.toString();
    const lectureId = new mongoose.Types.ObjectId();
    const lectId = lectureId.toString();

    setSections([
      ...sections,
      {
        _id: idString,
        sectionTitle: "",
        lectures: [
          {
            _id: lectId,
            content: {
              _id: "",
              video_url: "",
            },
            id: "1",
            duration: "",
            title: "",
          },
        ],
      },
    ]);
  };
  console.log(course, "new");

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
                          Edit your course
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
                              Cancel
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
                              <div className="grid w-full max-w-sm  gap-1.5">
                                <Label className="m-3">
                                  Add Image for your course
                                </Label>
                                <img
                                  className="h-[200px] w-full"
                                  src={previewImg}
                                  alt="course image"
                                />
                                <input
                                  type="file"
                                  name="courseImage"
                                  className="w-full p-2 bg-black text-white border rounded"
                                  accept="image/*"
                                  onChange={(e) => {
                                    previewFile(e);
                                    if (e.target.files) {
                                      if (e.target.files[0]) {
                                        const val = e.target.files[0];

                                        setImage({
                                          _id: image._id,
                                          image_url: val,
                                        });
                                      }
                                    }
                                  }}
                                />
                              </div>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label className="m-3">
                                  Add videos for your course
                                </Label>
                                <div className="mb-6">
                                  {sections.map((section, index) => (
                                    <div
                                      key={`${section} - ${index}`}
                                      className="border rounded-lg mb-4 p-4"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex-1">
                                          <Label
                                            htmlFor="Section"
                                            className="text-white"
                                          >
                                            Section {index + 1}
                                          </Label>
                                          <input
                                            type="text"
                                            value={section.sectionTitle}
                                            required
                                            onChange={(e) =>
                                              updateSectionTitle(
                                                index,
                                                e.target.value
                                              )
                                            }
                                            placeholder="Section Title"
                                            className="w-full p-2 bg-black text-white border rounded"
                                          />
                                        </div>
                                        <div className="flex gap-2 ml-2 ">
                                          <button
                                            onClick={() => deleteSection(index)}
                                            className="p-2 mt-4 text-red-600 hover:bg-red-50 rounded"
                                          >
                                            <Trash2 size={20} />
                                          </button>
                                        </div>
                                      </div>

                                      <div className=" ">
                                        {section.lectures.map(
                                          (lecture, ind) => (
                                            <div
                                              key={`${lecture} - ${ind}`}
                                              className="flex-col "
                                            >
                                              <div className="flex items-center gap-2 my-2">
                                                <div>
                                                  <Label className="text-white">
                                                    lecture {ind + 1}
                                                  </Label>
                                                  <input
                                                    type="text"
                                                    value={lecture.title}
                                                    onChange={(e) =>
                                                      updateLecture(
                                                        index,
                                                        ind,
                                                        "title",
                                                        e.target.value
                                                      )
                                                    }
                                                    required
                                                    placeholder="Lecture Title"
                                                    className="flex-1 p-2 border rounded bg-black text-white"
                                                  />
                                                </div>
                                                <Label className="text-white mt-4">
                                                  Duration
                                                </Label>
                                                <input
                                                  type="text"
                                                  value={lecture.duration}
                                                  required
                                                  onChange={(e) =>
                                                    updateLecture(
                                                      index,
                                                      ind,
                                                      "duration",
                                                      e.target.value
                                                    )
                                                  }
                                                  placeholder="Duration"
                                                  className="w-24 p-2 mt-4 border rounded bg-black text-white"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    deleteLecture(index, ind)
                                                  }
                                                  className="p-2 mt-4 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                  <Trash2 size={20} />
                                                </button>
                                              </div>
                                              <div>
                                                <Label
                                                  htmlFor="Duration"
                                                  className="text-white"
                                                >
                                                  Content
                                                </Label>
                                                <video
                                                  src={
                                                    lecture.content
                                                      .video_url as string
                                                  }
                                                  autoPlay
                                                  controls
                                                  loop
                                                />

                                                <input
                                                  type="file"
                                                  onChange={(e) => {
                                                    const target = e.target;
                                                    if (
                                                      target.files &&
                                                      target.files.length > 0
                                                    ) {
                                                      updateLecture(
                                                        index,
                                                        ind,
                                                        "content",
                                                        target.files[0]
                                                      );
                                                    }
                                                  }}
                                                  accept="video/*"
                                                  placeholder="Content"
                                                  className="w-full p-2 border rounded bg-black text-white"
                                                />
                                              </div>
                                              <Separator className="my-4" />
                                            </div>
                                          )
                                        )}

                                        <button
                                          type="button"
                                          onClick={() => addLecture(index)}
                                          className="mt-2 bg-white text-black flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
                                        >
                                          <Plus size={20} /> Add Lecture
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                                  <Button
                                    type="button"
                                    onClick={() => addSection()}
                                    className="bg-white text-black w-full"
                                  >
                                    {" "}
                                    Add Section
                                  </Button>
                                </div>
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
                              {errors.title ? (
                                <Label className="m-3 text-danger">
                                  Enter Title for your course
                                </Label>
                              ) : (
                                <Label className="m-3 text-white">
                                  Enter Title for your course
                                </Label>
                              )}
                              <Input
                                value={title}
                                minLength={3}
                                maxLength={60}
                                placeholder="Enter Title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                              />
                              <FormDescription>
                                {errors.title ? (
                                  <span className="text-danger">
                                    Minimum length of the title should be 3..
                                  </span>
                                ) : (
                                  <span>
                                    This is your public display Title.And the
                                    Minimum length of your course Title should
                                    be 3 and Maximum length is 60
                                  </span>
                                )}
                              </FormDescription>
                              {/* <FormDescription>
                                {errors.title && (
                                  <div className="text-danger">
                                    Minimum length of the title should be 3..
                                  </div>
                                )}
                              </FormDescription> */}
                              <div className="grid grid-cols-3 gap-1">
                                <div>
                                  <Label className="m-3 text-white">
                                    Choose Category
                                  </Label>
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
                                  <Label className="m-3 text-white">
                                    Choose Level
                                  </Label>
                                  <Select
                                    value={level}
                                    onValueChange={(value) => {
                                      setLevel(value);
                                    }}
                                  >
                                    <SelectTrigger className="w-100 rounded-full border-1 border-blue-900">
                                      <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="All">All</SelectItem>
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
                                </div>
                              </div>
                              {errors.thumbnail ? (
                                <Label className="m-3 text-danger">
                                  Enter Thumbnail for your course
                                </Label>
                              ) : (
                                <Label className="m-3 text-white">
                                  Enter Thumbnail for your course
                                </Label>
                              )}

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
                              {errors.description ? (
                                <>
                                  <Label className="m-3 text-danger">
                                    Enter Description for your course
                                  </Label>
                                </>
                              ) : (
                                <Label className="m-3 text-white">
                                  Enter Description for your course
                                </Label>
                              )}

                              <Input
                                type="string"
                                value={description}
                                minLength={10}
                                maxLength={500}
                                placeholder="Enter Description for your Course"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                              />
                              <FormDescription className="text-danger pt-2">
                                {errors.description && (
                                  <>
                                    "Minimum length of the Desciption should be
                                    10..
                                  </>
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
                                    {errors.price ? (
                                      <FormLabel className="text-danger">
                                        Price
                                      </FormLabel>
                                    ) : (
                                      <FormLabel className="text-white">
                                        Price
                                      </FormLabel>
                                    )}
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
                                      {errors.price ? (
                                        <span className="text-danger">
                                          Price should be in betwee RS: 50 - Rs:
                                          7999
                                        </span>
                                      ) : (
                                        <span>
                                          This is your public display Price.And
                                          the Price should be in betwee RS: 50 -
                                          Rs: 7999
                                        </span>
                                      )}
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              className="bg-white text-black mr-5"
                            >
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel all the
                                changes...?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction
                                className="bg-black text-white"
                                type="button"
                              >
                                Cancel
                              </AlertDialogAction>
                              <AlertDialogAction
                                type="button"
                                className="bg-black text-white"
                                onClick={()=>navigate(-1)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className="bg-white text-black"
                              type="button"
                            >
                              Edit
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Do you wnat to save theis changes? it will store
                                out server permenently.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction
                                className="bg-black text-white"
                                type="button"
                              >
                                Cancel
                              </AlertDialogAction>
                              <AlertDialogAction
                                type="button"
                                className="bg-black text-white"
                                onClick={handleSubmit}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
