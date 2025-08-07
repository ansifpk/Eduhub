import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { ITest } from "../../@types/testType";
import InstructorAside from "./InstructorAside";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";
import useRequest from "../../hooks/useRequest";
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

const AddTest = () => {
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { doRequest, errors } = useRequest();
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

  const [error, setErrors] = useState<QuestionError[]>(
    Array.from({ length: 5 }, () => ({
      question: true,
      option1: true,
      option2: true,
      option3: true,
      option4: true,
      answer: true,
    }))
  );

  const [questions, setQuestions] = useState<ITest[]>(
    Array.from({ length: 5 }, () => ({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    }))
  );

  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

  const handleQuestionChange = (
    index: number,
    key: keyof Question,
    errKey: keyof QuestionError,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    let item = updatedQuestions[index];
    item[key] = value;
    const err = [...error];
    let errItem = err[index];
    if (value.length > 0) {
      errItem[errKey] = false;
      setErrors(err);
    } else {
      errItem[errKey] = true;
      setErrors(err);
    }
    setQuestions(updatedQuestions);
  };

  const addTest = async () => {
    let success;
    error.map((val) => {
      if (
        val.question ||
        val.answer ||
        val.option1 ||
        val.option2 ||
        val.option3 ||
        val.option4
      ) {
        success = false;
      } else {
        success = true;
      }
    });
    if (!success) {
      return toast.error("Please provide all informations");
    }
    doRequest({
      url: `${instructorRoutes.tests}/${courseId}`,
      body: { testData: questions },
      method: "post",
      onSuccess: () => {
        navigate("/instructor/courses");
        return toast.success(`Successfully added the Test`);
      },
    });
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
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-0.5">
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Edu Hub
            </h2>
            <p className="text-muted-foreground">
              Manage your instructor account students and courses.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0">
          <InstructorAside />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <Separator orientation="vertical" />
          <div className=" flex flex-col items-center justify-center h-screen w-full">
            <div className=" text-center text-sm text-white ">
              Slide {current} of {count}
            </div>
            <Carousel setApi={setApi} className="w-100 h-[400px] ">
              <CarouselContent>
                {questions.map((_value, index) => (
                  <CarouselItem key={index}>
                    <Card className="bg-black text-white">
                      <CardContent className=" h-[450px] ">
                        <div>
                          <div className="grid    gap-1.5">
                            <Label className="text-white">Question</Label>
                            <Textarea
                              required
                              value={questions[index].question}
                              onChange={(e) =>
                                handleQuestionChange(
                                  index,
                                  "question",
                                  "question",
                                  e.target.value
                                )
                              }
                              className="h-[100px] bg-black text-white"
                              placeholder="Type your message here."
                              id="message-2"
                            />
                            {error[index].question ? (
                              <p className="text-sm text-danger text-muted-foreground">
                                This field is required
                              </p>
                            ) : (
                              <p className="text-sm  text-muted-foreground">
                                This is the question for your Test
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="flex gap-3">
                              <div className="grid w-full gap-1.5">
                                <Label className="text-white">Option 1</Label>
                                <Input
                                  className="bg-black"
                                  value={questions[index].option1}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      index,
                                      "option1",
                                      "option1",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Type your message here."
                                  id="Option1"
                                />
                                {error[index].option1 ? (
                                  <p className="text-sm text-danger text-muted-foreground">
                                    This field is required
                                  </p>
                                ) : (
                                  <p className="text-sm  text-muted-foreground">
                                    This is the option 1 for your question
                                  </p>
                                )}
                              </div>
                              <div className="grid w-full gap-1.5">
                                <Label className="text-white">Option 2</Label>
                                <Input
                                  value={questions[index].option2}
                                  className="bg-black"
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      index,
                                      "option2",
                                      "option2",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Type your message here."
                                  id="message-2"
                                />
                                {error[index].option2 ? (
                                  <p className="text-sm text-danger text-muted-foreground">
                                    This field is required
                                  </p>
                                ) : (
                                  <p className="text-sm  text-muted-foreground">
                                    This is the option 2 for your question
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-3">
                              <div className="grid w-full gap-1.5">
                                <Label className="text-white">Option 3</Label>
                                <Input
                                  className="bg-black"
                                  value={questions[index].option3}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      index,
                                      "option3",
                                      "option3",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Type your message here."
                                  id="Option1"
                                />
                                {error[index].option3 ? (
                                  <p className="text-sm text-danger text-muted-foreground">
                                    This field is required
                                  </p>
                                ) : (
                                  <p className="text-sm  text-muted-foreground">
                                    This is the option 3 for your question
                                  </p>
                                )}
                              </div>
                              <div className="grid w-full gap-1.5">
                                <Label className="text-white">Option 4</Label>
                                <Input
                                  className="bg-black"
                                  value={questions[index].option4}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      index,
                                      "option4",
                                      "option4",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Type your message here."
                                  id="message-2"
                                />
                                {error[index].option4 ? (
                                  <p className="text-sm text-danger text-muted-foreground">
                                    This field is required
                                  </p>
                                ) : (
                                  <p className="text-sm  text-muted-foreground">
                                    This is the option 4 for your question
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-3 items-center justify-center">
                              <div className="grid w-50 gap-1.5">
                                <Label className="text-white">Answer</Label>
                                <Input
                                  className="bg-black"
                                  value={questions[index].answer}
                                  required
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      index,
                                      "answer",
                                      "answer",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Type your message here."
                                  id="message-2"
                                />
                                {error[index].answer ? (
                                  <p className="text-sm text-danger text-muted-foreground">
                                    This field is required
                                  </p>
                                ) : (
                                  <p className="text-sm  text-muted-foreground">
                                    This is the answer for your question
                                  </p>
                                )}
                              </div>
                            </div>
                            {current == 5 && (
                              <div className="flex justify-center mt-4">
                                <Button
                                  type="submit"
                                  className="bg-white text-black hover:bg-white hover:text-black"
                                  onClick={addTest}
                                >
                                  Submit
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
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
    </div>
  );
};

export default AddTest;
