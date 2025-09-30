import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
const Header = React.lazy(() => import('@/components/user/Header'));
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  useNavigate, useParams } from 'react-router-dom';
import useRequest from '@/hooks/useRequest';
import { Card, CardContent } from "@/components/ui/card";
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
import { Loader2Icon } from 'lucide-react';
import userRoutes from '@/service/endPoints/userEndPoints';
import { assessmentTestSchema, type AssessmentTestForm } from '@/util/schemas/assessmentTestScheema';
import toast from 'react-hot-toast';
import type { IUser } from '@/@types/userType';
import { useSelector } from 'react-redux';






const AssesmentTest = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const [_count,setCount] = useState(0);
    const [mark, setMark] = useState(0);
    const [_current,setCurrent] = useState(0);
    const [api, setApi] = useState<CarouselApi>();
    const userId = useSelector((state: IUser) => state._id);
    
    const {
        register,
        watch,
        setValue,
        handleSubmit,
    } = useForm<AssessmentTestForm>({
        resolver: zodResolver(assessmentTestSchema),
        defaultValues: {
        questions: Array.from({ length: 5 }, () => ({
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: "",
            selected: "",
        })),
        },
    });
      const { testId } = useParams();
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

       useEffect(() => {
   
    doRequest({
          url:`${userRoutes.test}/${testId}`,
          body:{},
          method:"get",
          onSuccess:(response)=>{
            setValue("questions",response.test.test)
          }
        });
    },[testId]);
    
    const handleErrors = () =>{
        toast.error("Please try to enter all the answers and try again!")
    }
    const handleQuestions = async(data: AssessmentTestForm) => {
        setLoading(true);
        let calculateMark = 0;
        data.questions.map((value)=>{
           if(value.answer==value.selected){
            calculateMark++
           }
        })
        setMark(calculateMark);
        
        await doRequest({
            url:`${userRoutes.test}/${testId}`,
            method:"patch",
            body:{userId,mark:calculateMark},
            onSuccess:()=>{
              setResult(true);
              setLoading(false);
            }
        })
    };

    useEffect(() => {
        setLoading(false);
        err?.map((err) => toast.error(err.message));
    }, [err]);

  if(result){
    return (
        <div className='w-75 mx-auto flex justify-center items-center-safe h-screen'>
           <div className='flex flex-col items-center justify-center-safe'>
              <h4>YOU GOT</h4>
              <h4>{mark}/5</h4>

              <div className="flex gap-2 m-2">
                  {
                    watch("questions").map((_value,index)=>(
                        <div key={index+1} className="p-1 w-[180px] h-[180px] border">
                            <label>Your Answer</label>
                            <div className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                                    watch(`questions.${index}.answer`) == watch(`questions.${index}.selected`)
                                    ? "bg-green-100 border-green-500"
                                    :"bg-red-200 border-red-500" }`}>
                                <input type='checkbox' checked={true} id="terms2" disabled />
                                <label>{watch(`questions.${index}.selected`)}</label>
                            </div>
                             <label>Currect Answer</label>
                            <div className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`} >
                                <input type='checkbox' checked={true} id="terms2" disabled />
                                <label>{watch(`questions.${index}.answer`)}</label>
                            </div>
                        </div>
                    ))
                  }
              </div>
              <div className="flex justify-center">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-teal-400 hover:bg-teal-400"
                >
                    back to class
                </button>
            </div>
           </div>
        </div>
    )
  }

  return (
    <div>
        <Header />
        <div className="p-2 space-y-2">
            <div className=" flex flex-col items-center w-full">
                <div className=" text-center text-sm text-black ">
                  <div className="mb-4">
                    <span className='text-3xl'>Assessment Test</span>
                  </div>
                </div>
                <Carousel setApi={setApi} className="w-[75%] h-[430px]">
                <CarouselContent>
                    {watch("questions").map((_value, index) => (
                    <CarouselItem key={index}>
                        <Card className=" text-black">
                        <CardContent>
                             <span className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                                Question {index + 1}
                            </span>
                            <form
                            className="space-y-3"
                            onSubmit={handleSubmit(handleQuestions,handleErrors)}
                            >
                            <div>
                                <textarea disabled
                                {...register(`questions.${index}.question`)}
                                className="border border-teal-400 w-full rounded h-40 p-2"
                                placeholder="Enter question"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2"> 
                                <div
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border border-teal-400`}
                                    >
                                    <input type="checkbox" checked={watch(`questions.${index}.option1`) == watch(`questions.${index}.selected`)} {...register(`questions.${index}.option1`)} onChange={()=>setValue(`questions.${index}.selected`,watch(`questions.${index}.option1`))} value={watch(`questions.${index}.option1`)} />
                                    <label>{watch(`questions.${index}.option1`)}</label> 
                                </div>
                                <div
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border border-teal-400`}
                                    >
                                    <input type="checkbox" checked={watch(`questions.${index}.option2`) == watch(`questions.${index}.selected`)} {...register(`questions.${index}.option2`)} onChange={()=>setValue(`questions.${index}.selected`,watch(`questions.${index}.option2`))} value={watch(`questions.${index}.option2`)} />
                                    <label>{watch(`questions.${index}.option2`)}</label> 
                                </div>
                                <div
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border border-teal-400`}
                                    >
                                    <input type="checkbox" checked={watch(`questions.${index}.option3`) == watch(`questions.${index}.selected`)} {...register(`questions.${index}.option3`)} onChange={()=>setValue(`questions.${index}.selected`,watch(`questions.${index}.option3`))} value={watch(`questions.${index}.option3`)} />
                                    <label>{watch(`questions.${index}.option3`)}</label> 
                                </div>
                                <div
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border border-teal-400`}
                                    >
                                    <input type="checkbox" checked={watch(`questions.${index}.option4`) == watch(`questions.${index}.selected`)} {...register(`questions.${index}.option4`)} onChange={()=>setValue(`questions.${index}.selected`,watch(`questions.${index}.option4`))} value={watch(`questions.${index}.option4`)} />
                                    <label>{watch(`questions.${index}.option4`)}</label> 
                                </div>
                            </div>
                           
                            <div className="flex justify-center-safe gap-4">
                               
                                {index == 4 && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="bg-teal-400 cursor-pointer text-white rounded p-2"
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
                                        This will save the dats you provide in our server of Eduhub
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                        className="bg-teal-400 cursor-pointer text-white"
                                        type="button"
                                        >
                                        Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogCancel
                                        className="bg-teal-400 cursor-pointer text-white"
                                        type="submit"
                                        onClick={() =>
                                            handleSubmit(handleQuestions,handleErrors)()
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
  )
}

export default React.memo(AssesmentTest)
