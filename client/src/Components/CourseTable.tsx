import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "@/@types/userType";
import { addTestToCourse, editTestToCourse, getCourses, instructorPlans, listCourses } from "@/Api/instructor";
import toast from "react-hot-toast";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ICourse } from "@/@types/courseType";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { ITest } from "@/@types/testType";
import { IUser } from "@/@types/chatUser";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { IInstructorSubscribe } from "@/@types/instructorSubscribe";

export function Coursestable() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [courseId, setCourseId] = useState<ICourse>();
  const [sort, setSort] = useState("");
  const instructorId = useSelector((state: User) => state.id);
  const { isOpen:isAddOpen, onOpen:addOpen, onClose:addClose } = useDisclosure();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState<IUser[]>([]);
  const [test, setTest] = useState<ITest>();
  const [subscriptions, setSubscriptions] = useState<IInstructorSubscribe[]>([]);
  
  interface Question {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string; 
  }
  interface QuestionError {
    question: boolean;
    option1: boolean;
    option2: boolean;
    option3: boolean;
    option4: boolean;
    answer: boolean; 
  }
  const [questions, setQuestions] = useState<ITest[]>(Array.from({ length: 5 }, () => ({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  })));

  const [errors, setErrors] = useState<QuestionError[]>(Array.from({ length: 5 }, () => ({
    question: true,
    option1: true,
    option2: true,
    option3: true,
    option4: true,
    answer: true
  })));
  
  
  const handleQuestionChange = (index: number,key:keyof Question, errKey:keyof QuestionError, value: string) => {
    const updatedQuestions = [...questions];
    let item = updatedQuestions[index]
    item[key]=value;
    const err = [...errors];
    let errItem = err[index]    
    if(value.length>0){
      errItem[errKey]=false;
      setErrors(err)
    }else{    
      errItem[errKey]=true;
      setErrors(err)
    }
    setQuestions(updatedQuestions);
  
  };
  const clearStates = () => {
    setQuestions(Array.from({ length: 5 }, () => ({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: ''
    })));
    setErrors(Array.from({ length: 5 }, () => ({
      question: true,
      option1: true,
      option2: true,
      option3: true,
      option4: true,
      answer: true
    })));
  }

  const addStates = (test:ITest[]) => {  
    
    setQuestions(test);
    setErrors(Array.from({ length: 5 }, () => ({
      question: false,
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      answer: false
    })));
  }
  const addTest = async() => {
    addOpen();
    let success 
    errors.map((val)=>{
      if(val.question||val.answer||val.option1||val.option2||val.option3||val.option4){
        success = false
      }else{
        success = true
      }
    })    
    if(!success){
       return toast.error("Please provide all informations")
    }
    
    const response = await addTestToCourse(questions,courseId!._id)
    if(response.success){
      const data = await getCourses(instructorId,sort);
      if (data.success) {
        setCourses(data.courses);
        addClose()
        clearStates()
        
        return toast.success(`Successfully added the Test`)
      }
      
    }else{
     return toast.error(response.respons.data.message)
    } 
  }
  
  
  const editTest = async() => {
    addStates(questions)
    addOpen();
    let success 
    errors.map((val)=>{
      if(val.question||val.answer||val.option1||val.option2||val.option3||val.option4){
        success = false
      }else{
        success = true
      }
    })    
    if(!success){
       return toast.error("Please provide all informations")
    }
    const response = await editTestToCourse(questions,courseId!.test._id)
    if(response.success){
      const data = await getCourses(instructorId,sort);
     
      
      if (data.success) {
        setCourses(data.courses);
        addClose()
        clearStates()
        return  toast.success(`Successfully Edited the Test `)
      }
     
     
    }else{
      return toast.error(response.respons.data.message)
    }
    
   
  }

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

  useEffect(() => {
    const res = async () => {
      const data = await getCourses(instructorId,sort);
      if (data.success) {
        setCourses(data.courses);
      }else if(data.status == 403){
        return toast.error("Blocked by admin")
      }else{
        return toast.error(data.response.data.message)
      }
      
      const response = await instructorPlans(instructorId)
      if(response.success){
       setSubscriptions(response.plans);
       return 
      }else if(response.status == 403){
        toast.error(response.response.data.message)
        return navigate('/instructor/login')
      }else{
       return toast.error(response.response.data.message)
      }
    };
    res();
  }, [sort]);

  const listingCourses = courses.filter((val: ICourse) => {
    let arr = val.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
    return arr;
  });

  const handleCourses = async (course: ICourse) => {
    if (course.sections.length == 0) {
      return toast.error(
        "You cannot list this course becouse the video uploading is still processing..."
      );
    }

    const res = await listCourses(course._id);
    if (res.success) {
      const respons = await getCourses(instructorId,sort);
      setCourses(respons.courses);
      if (res.course.isListed) {
        toast.success("Successfully Listed Course");
      } else {
        toast.success("Successfully UnListed Course");
      }
    } else {
      toast.success(res.response.data.message);
    }
  };

  const checkSubscription = (course:ICourse) => {
      if(subscriptions.length>0){
        setCourseId(course);
        addOpen()
      }else{
        navigate("/instructor/purchaseSubscription")
      }
  } 
  const navigate = useNavigate();

  
  return (
    <>
      <div className="flex items-center justify-between space-y-2 w-full">
        <div>
          <div className="text-white">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here is the list of courses of your...
            </p>
          </div>
        </div>
        <div>
          <div className="text-white flex gap-2">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-[100px] lg:w-[300px] bg-black text-white"
              />
            </div>
            <Button
              className="bg-white text-black"
              onClick={() => navigate("/instructor/createCourse")}
              variant="outline"
            >
              create Course
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger id="framework" className="h-8 lg:w-[200px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
            <SelectItem value="Price Low - High">Price Low - High</SelectItem>
            <SelectItem value="Price High - Low">Price High - Low</SelectItem>
            <SelectItem value="Name High - Low">Name High - Low</SelectItem>
            <SelectItem value="Name Low - High">Name Low - High</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Title</TableHead>
                <TableHead className="text-xs">Thumbnail</TableHead>
                <TableHead className="text-xs">Created At</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Price</TableHead>
                <TableHead align="center">Students</TableHead>
                {/* <TableHead align="center">Test</TableHead> */}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {listingCourses.length > 0 ? (
                listingCourses.map((val: ICourse, index) => (
                  <TableRow key={index}>
                    <TableCell className=" text-xs ">{val.title}</TableCell>
                    <TableCell className="text-xs ">{val.thumbnail}</TableCell>
                    <TableCell className="text-xs">{val.createdAt.slice(0, 10)}</TableCell>
                    <TableCell >
                      <Badge
                      
                        className={
                          val.isListed
                            ? "bg-black text-success text-xs"
                            : "bg-black text-danger text-xs"
                        }
                      >
                        {val.isListed ? "Listed" : "UnListed"}
                      </Badge>
                      </TableCell>
                    <TableCell className="text-xs">
                      
                        {val.price}
                     
                    </TableCell>
                  
                    <TableCell align="center">
                          <Button
                            size={"sm"}
                            onClick={()=>{
                              setStudents(val?.students!)
                              onOpen()
                            }}
                            className="bg-black text-xs text-white rounded-full border-1 border-white"
                          >
                            View Students
                          </Button>

                          <Drawer
                            isOpen={isOpen}
                            size={"4xl"}
                            onClose={onClose}
                          >
                            <DrawerContent>
                              {(onClose) => (
                                <>
                                  <DrawerHeader className="flex flex-col gap-1">
                                    Students Lists.
                                  </DrawerHeader>
                                  <DrawerBody>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="w-[100px] ">
                                            Image
                                          </TableHead>
                                          <TableHead>Name</TableHead>
                                          <TableHead>email</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {students?.length! > 0 ? (
                                          students?.map((student) => (
                                            <TableRow  key={student._id}> 
                                              <TableCell className="font-medium">
                                                {" "}
                                                <img
                                                  src={
                                                    "https://github.com/shadcn.png"
                                                  }
                                                  alt="Profile Picture"
                                                  className="profile-pic"
                                                />
                                              </TableCell>
                                              <TableCell>
                                                {student.name}
                                              </TableCell>
                                              <TableCell>
                                                {student.email}
                                              </TableCell>
                                            </TableRow>
                                          ))
                                        ) : (
                                          <TableRow>
                                            <TableCell>
                                              no students purchased this course
                                            </TableCell>
                                          </TableRow>
                                        )}
                                        
                                      </TableBody>
                                    </Table>
                                  </DrawerBody>
                                  <DrawerFooter>
                                    <Button
                                      color="danger"
                                      // variant="light"
                                      onClick={onClose}
                                    >
                                      Close
                                    </Button>
                                    <Button color="primary" onClick={onClose}>
                                      Action
                                    </Button>
                                  </DrawerFooter>
                                </>
                              )}
                            </DrawerContent>
                          </Drawer>
                        </TableCell>
                     
                    <TableCell>
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/instructor/editCourse/${val._id}`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                {val.isListed ? "UnList" : "List"}
                              </DropdownMenuItem>
                            </DialogTrigger>
                            {val.test?
                            <DropdownMenuItem onClick={() => {
                              addStates(val.test.test!)
                              setCourseId(val)
                              addOpen()
                              }}>
                              Edit Test
                            </DropdownMenuItem>
                            :
                            <DropdownMenuItem onClick={() =>checkSubscription(val)} >
                              Add Test
                              < WorkspacePremiumIcon className="text-warning" />
                            </DropdownMenuItem>
                            }
                           
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              Are you absolutly sure you want to list this
                              items?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                className="bg-black text-white"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() => handleCourses(val)}
                                className="bg-black text-white"
                              >
                                Continue
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Drawer className="bg-black" isOpen={isAddOpen} size={"full"} onClose={()=>{
                        addClose()
                        clearStates()
                        // setCourseId(undefined)
                      }}>
                        <DrawerContent>
                          {(addClose) => (
                            <>
                              <DrawerHeader className="flex flex-col  text-white">
                                {courseId?.test?.test?`Edit test`:`Add test`}
                              </DrawerHeader>
                              <DrawerBody className="flex  items-center">
                                <div className=" text-center text-sm text-white text-muted-foreground">
                                  Slide {current} of {count}
                                </div>
                                <Carousel
                                  setApi={setApi}
                                  className="w-50 h-[400px] "
                                >
                                  <CarouselContent>
                                    {questions.map(
                                      (value, index) => (
                                        <CarouselItem key={index}>
                                          <Card className="bg-black text-white">
                                            <CardContent className=" h-[450px] ">
                                              <div>
                                                <div className="grid    gap-1.5">
                                                  <Label className="text-white">
                                                    Question
                                                  </Label>
                                                  <Textarea
                                                    required
                                                    value={questions[index].question}
                                                    onChange={(e)=>handleQuestionChange(index,"question","question",e.target.value)}
                                                    className="h-[100px] bg-black text-white"
                                                    placeholder="Type your message here."
                                                    id="message-2"
                                                  />
                                                   {errors[index].question? <p className="text-sm text-danger text-muted-foreground">
                                                        This field is required
                                                        </p>:<p className="text-sm  text-muted-foreground">
                                                        This is the question for your Test
                                                      </p>}
                                                </div>
                                                <div >
                                                  <div className="flex gap-3">
                                                    <div className="grid w-full gap-1.5">
                                                      <Label  className="text-white">
                                                        Option 1
                                                      </Label>
                                                      <Input
                                                      className="bg-black"
                                                      value={questions[index].option1}
                                                      onChange={(e)=>handleQuestionChange(index,"option1","option1",e.target.value)}
                                                        placeholder="Type your message here."
                                                        id="Option1"
                                                      />
                                                      {errors[index].option1? <p className="text-sm text-danger text-muted-foreground">
                                                        This field is required
                                                        </p>:<p className="text-sm  text-muted-foreground">
                                                        This is the option 1 for your question
                                                      </p>}
                                                    </div>
                                                    <div className="grid w-full gap-1.5">
                                                      <Label  className="text-white">
                                                        Option 2
                                                      </Label>
                                                      <Input
                                                      value={questions[index].option2}
                                                       className="bg-black"
                                                       onChange={(e)=>handleQuestionChange(index,"option2","option2",e.target.value)}
                                                        placeholder="Type your message here."
                                                        id="message-2"
                                                      />
                                                       {errors[index].option2? <p className="text-sm text-danger text-muted-foreground">
                                                        This field is required
                                                        </p>:<p className="text-sm  text-muted-foreground">
                                                        This is the option 2 for your question
                                                      </p>}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div >
                                                  <div className="flex gap-3">
                                                    <div className="grid w-full gap-1.5">
                                                      <Label className="text-white">
                                                        Option 3
                                                      </Label>
                                                      <Input
                                                       className="bg-black"
                                                       value={questions[index].option3}
                                                       onChange={(e)=>handleQuestionChange(index,"option3","option3",e.target.value)}
                                                        placeholder="Type your message here."
                                                        id="Option1"
                                                      />
                                                       {errors[index].option3? <p className="text-sm text-danger text-muted-foreground">
                                                        This field is required
                                                        </p>:<p className="text-sm  text-muted-foreground">
                                                        This is the option 3 for your question
                                                      </p>}
                                                    </div>
                                                    <div className="grid w-full gap-1.5">
                                                      <Label className="text-white">
                                                        Option 4
                                                      </Label>
                                                      <Input
                                                       className="bg-black"
                                                       value={questions[index].option4}
                                                       onChange={(e)=>handleQuestionChange(index,"option4","option4",e.target.value)}
                                                        placeholder="Type your message here."
                                                        id="message-2"
                                                      />
                                                       {errors[index].option4? <p className="text-sm text-danger text-muted-foreground">
                                                        This field is required
                                                        </p>:<p className="text-sm  text-muted-foreground">
                                                        This is the option 4 for your question
                                                      </p>}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div >
                                                  <div className="flex gap-3 items-center justify-center">
                                                    <div className="grid w-50 gap-1.5">
                                                      <Label className="text-white">
                                                        Answer
                                                      </Label>
                                                      <Input
                                                       className="bg-black"
                                                       value={questions[index].answer}
                                                       required
                                                       onChange={(e)=>handleQuestionChange(index,"answer","answer",e.target.value)}
                                                        placeholder="Type your message here."
                                                        id="message-2"
                                                      />
                                                       {errors[index].answer? <p className="text-sm text-danger text-muted-foreground">
                                                        This field is required
                                                      </p>:<p className="text-sm  text-muted-foreground">
                                                        This is the answer for your question
                                                      </p>}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </CarouselItem>
                                      )
                                    )}
                                  </CarouselContent>
                                  <CarouselPrevious />
                                  <CarouselNext />
                                </Carousel>
                              </DrawerBody>
                              <DrawerFooter>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button>Cancel</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure hi?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        delete all your informations that you
                                        are give . are absolutly sure?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogAction
                                        onClick={() => {
                                          addStates(questions)
                                          addOpen()}}
                                      >
                                        Cancel
                                      </AlertDialogAction>
                                      <AlertDialogAction
                                        onClick={() =>{
                                           clearStates()
                                           addClose()
                                           
                                        }}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button>{courseId?.test?.test?"Edit Test":"Add Test"}</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to save this
                                        informations?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogAction
                                        onClick={() => {
                                          addStates(questions)
                                          addOpen()}}
                                      >
                                        Cancel
                                      </AlertDialogAction>
                                      <AlertDialogAction
                                        onClick={()=> {courseId?.test?.test?editTest():addTest()}}
                                        
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DrawerFooter>
                            </>
                          )}
                        </DrawerContent>
                      </Drawer>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={20}>
                    No courses Exists
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
