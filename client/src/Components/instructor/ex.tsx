import React, { useEffect,  useState } from "react";
import imageCompression from 'browser-image-compression'
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
import { createCourse, uploadVideo } from "@/Api/instructor";
import { useSelector } from "react-redux";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Plus,
  
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import InstructorAside from "./InstructorAside";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import axios from "axios";


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
    .max(500, {
      message: "Description must be lesthan 120 characters.",
    }),
  subcategory: z.string().min(1, {
    message: "At least choose one sub Category.",
  }),
  levels: z.string().min(1, {
    message: "At least choose one level.",
  }),
  courseprice: z.number(),
 
  courseImage: z.instanceof(File, {
    message: "A thumbnile image is required.",
  }),
});

const Ex: React.FC<Title> = ({ Title, Category, categories }) => {
  const [select, setSelect] = useState("Carriculum");
  const [category, setCategory] = useState(Category);
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDiscription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [topics, setTopics] = useState([]);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({
    _id:"" as string,
    image_url:"" as string | File
  });
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
    
      
      toast.error("Please provide all the details");
    }
  }, [category, categories, form.formState.errors]);


  const onSubmit = async () => {
    const formData = new FormData()
    setLoading(true)
    formData.append("title",title)
    formData.append("courseImage",image.image_url)
    formData.append("thumbnail",thumbnail)
    formData.append("description",description)
    formData.append("category",category)
    formData.append("subCategory",subCategory)
    formData.append("instructorId",instructorId)
    formData.append("level",level)
    formData.append("price",JSON.stringify(price))
    formData.append("sectionsVideos",JSON.stringify(sections))
    
    for(let i=0;i<sections.length;i++){
      for(let j=0;j<sections[i].lectures.length;j++){
        let data = sections[i].lectures[j].content.video_url as File
        formData.append('courseVideo',data, `section${i}_lecture${j}_${data.name}`)
      }
    }

    const data = await createCourse(formData)
    if(data.success){
      console.log(data.course)
      setLoading(false)
      toast.success("Successfully created Course")
    
      navigate('/instructor/courses')

    }else{
      setLoading(false)
      return toast.error(data.response.data.message)
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

  const [sections, setSections] = useState([
    {
      id: 1,
      sectionTitle: "",
      isExpanded: true,
      lectures: [
        {
          id: 1,
          title: "",
          content: {
            _id:"" as string,
            video_url: "" as string | File,
          },
          duration: "",
          type: "video",
        },
      ],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length + 1,
        sectionTitle: "",
        isExpanded: true,
        lectures: [],
      },
    ]);
  };

  const addLecture = (sectionId: number) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: [
              ...section.lectures,
              {
                id: section.lectures.length + 1,
                title: "",
                content: {
                  _id:"",
                  video_url:"" as string |File
                },
                duration: "",
                type: "video",
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const updateSectionTitle = (sectionId: number, newTitle: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, sectionTitle: newTitle } : section
      )
    );
  };

  const updateLecture = (
    sectionId: number,
    lectureId: number,
    field: string,
    value: string|File
  ) => {
   
    
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
           if(field == "content"){
              
              return {
                ...section,
                lectures: section.lectures.map((lecture) =>
                  lecture.id === lectureId
                    ? { ...lecture, [field]:{_id:"1",video_url:value} }
                    : lecture
                ),
              };
           }else{
            return {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId
                  ? { ...lecture, [field]:value }
                  : lecture
              ),
            };
           }
        }
        return section;
      })
    );
  };

  const toggleSectionExpand = (sectionId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const deleteSection = (sectionId: number) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const deleteLecture = (sectionId: number, lectureId: number) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.filter(
              (lecture) => lecture.id !== lectureId
            ),
          };
        }
        return section;
      })
    );
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
                                  render={() => (
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
                                                  setImage({
                                                    _id:`1`,
                                                    image_url:val
                                                  });
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
                              <div className="grid w-full items-center gap-1.5">
                                <Label className="text-white my-2">
                                  videos Section
                                </Label>
                                <div className="mb-6">
                                  {sections.map((section,index) => (
                                    <div
                                    key={`${section} - ${index}`}
                                      className="border rounded-lg mb-4 p-4"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex-1">
                                             <Label htmlFor="Section" className="text-white">
                                               Section {index+1}
                                              </Label>
                                          <input
                                            type="text"
                                            value={section.sectionTitle}
                                            onChange={(e) =>
                                              updateSectionTitle(
                                                section.id,
                                                e.target.value
                                              )
                                            }
                                            placeholder="Section Title"
                                            className="w-full p-2 bg-black text-white border rounded"
                                          />
                                        </div>
                                        <div className="flex gap-2 ml-2 ">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              toggleSectionExpand(section.id)
                                            }
                                            className="p-2 mt-4 bg-white hover:bg-gray-100 rounded"
                                          >
                                            {section.isExpanded ? (
                                              <ChevronUp size={20} />
                                            ) : (
                                              <ChevronDown size={20} />
                                            )}
                                          </button>
                                          <button
                                            onClick={() =>
                                              deleteSection(section.id)
                                            }
                                            className="p-2 mt-4 text-red-600 hover:bg-red-50 rounded"
                                          >
                                            <Trash2 size={20} />
                                          </button>
                                        </div>
                                      </div>

                                      {section.isExpanded && (
                                        <div className=" ">
                                          {section.lectures.map((lecture,ind) => (
                                            <div key={`${lecture} - ${ind}`} className="flex-col " >

                                              <div
                                           
                                              className="flex items-center gap-2 my-2"
                                            >
                                               <div>
                                               <Label className="text-white">lecture {ind+1}</Label>
                                              <input
                                                type="text"
                                                value={lecture.title}
                                                onChange={(e) =>
                                                  updateLecture(
                                                    section.id,
                                                    lecture.id,
                                                    "title",
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Lecture Title"
                                                className="flex-1 p-2 border rounded bg-black text-white"
                                              />
                                               </div>
                                               <Label  className="text-white mt-4">
                                               Duration
                                              </Label>
                                              <input
                                                type="text"
                                                value={lecture.duration}
                                                onChange={(e) =>
                                                  updateLecture(
                                                    section.id,
                                                    lecture.id,
                                                    "duration",
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Duration"
                                                className="w-24 p-2 mt-4 border rounded bg-black text-white"
                                              />
                                              <button
                                                onClick={() =>
                                                  deleteLecture(
                                                    section.id,
                                                    lecture.id
                                                  )
                                                }
                                                className="p-2 mt-4 text-red-600 hover:bg-red-50 rounded"
                                              >
                                                <Trash2 size={20} />
                                              </button>
                                              
                                            </div>
                                              <div>
                                              <Label htmlFor="Duration" className="text-white">
                                              Content
                                              </Label>
                                              <input
                                                type="file"
                                                // value={lecture.content.name}
                                                onChange={(e) =>{
                                                    const target = e.target;
                                                    if(target.files&&target.files.length>0){
                                                      updateLecture(
                                                        section.id,
                                                        lecture.id,
                                                        "content",
                                                        target.files[0]
                                                      )
                                                    }
                                                    
                
                                                }}
                                                accept="video/*"
                                                placeholder="Content"
                                                required
                                                className="w-full p-2 border rounded bg-black text-white"
                                              />
                                              </div>
                                              <Separator className="my-4" />
                                            </div>
                                          ))}
                                          
                                          <button
                                            type="button"
                                            onClick={() =>
                                              addLecture(section.id)
                                            }
                                            className="mt-2 bg-white text-black flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
                                          >
                                            <Plus size={20} /> Add Lecture
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>

                                <button
                                  onClick={addSection}
                                  type="button"
                                  className="w-full flex items-center justify-center gap-2 bg-white text-black p-2 rounded hover:bg-blue-700"
                                >
                                  <Plus size={20} /> Add New Section
                                </button>
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
                                render={() => (
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
                                  render={() => (
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
                                                    (value: ICategory,indx:number) => (
                                                      <SelectItem
                                                        key={`${value} - ${indx}`}
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
                                  render={() => (
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
                                                    (value, inx) => (
                                                      <SelectItem
                                                      key={`${value} - ${inx}`}
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
                                  render={() => (
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
                                render={() => (
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
                                render={() => (
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
                                render={() => (
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

export default Ex;
