import { ITest } from "@/@types/testType";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
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
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/Components/ui/label";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import toast from "react-hot-toast";

const AssesmentTest = () => {
  const { testId } = useParams();
  const {doRequest,errors} = useRequest()
  const [test, setTest] = useState<ITest[]>([]);
  const [isSelected, setIsSelected] = useState({
    selecte1: "",
    selecte2: "",
    selecte3: "",
    selecte4: "",
    selecte5: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
   
      doRequest({
          url:`${userRoutes.test}/${testId}`,
          body:{},
          method:"get",
          onSuccess:(response)=>{
             if(response.test.students.some((user: { user: string }) => user.user)){
              return navigate(-1);
             }else{
              setTest(response.test.test);
             }
          }
        })
 
   
  },[testId]);

  const [page, setPage] = useState(1);
  const [mark, setMark] = useState(0);
  const userId = useSelector((state: User) => state.id);

  const handleSubmit = async () => {
    let calculateMark = 0;
    if (isSelected.selecte1 == test[0].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte2 == test[1].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte3 == test[2].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte4 == test[3].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte5 == test[4].answer) {
      calculateMark += 1;
    }

    setMark(calculateMark);
   await doRequest({
      url:`${userRoutes.test}/${testId}`,
      method:"patch",
      body:{userId,mark:calculateMark},
      onSuccess:()=>setPage((prev) => (prev += 1))
    })
  };

  const handleEndTest = async () => {
    for (const key in isSelected) {
      const val = isSelected[key as keyof typeof isSelected];
      if (val.length == 0) {
        isSelected[key as keyof typeof isSelected] = "Not Answered";
      }
    }
    let calculateMark = 0;
    if (isSelected.selecte1 == test[0].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte2 == test[1].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte3 == test[2].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte4 == test[3].answer) {
      calculateMark += 1;
    }
    if (isSelected.selecte5 == test[4].answer) {
      calculateMark += 1;
    }

    setMark(calculateMark);
    await doRequest({
      url:`${userRoutes.test}/${testId}`,
      method:"patch",
      body:{userId,mark:calculateMark},
      onSuccess:()=>setPage(6)
    })
    
  };

  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors])
  
  return (
    <div className="bg-blue-50">
      <Header />
      <ProfileNavbar />
      <main className="w-full flex justify-center  gap-10 py-8">
        {page == 6 ? (
          <div className="w-75">
            <h4>YOU GOT</h4>
            <h4>{mark}/5</h4>
            <div className="flex gap-2 m-2">
              <div className="p-1 w-[250px] h-[180px] border">
                <Label>Your Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                    isSelected.selecte1 == test[0]?.answer
                      ? "bg-green-100 border-green-500"
                      : "bg-danger-200 border-danger-500"
                  }`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{isSelected.selecte1}</Label>
                </div>
                <Label>Currect Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{test[0]?.answer}</Label>
                </div>
              </div>
              <div className="p-1 w-[250px] h-[180px] border">
                <Label>Your Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                    isSelected.selecte2 == test[1]?.answer
                      ? "bg-green-100 border-green-500"
                      : "bg-danger-200 border-danger-500"
                  }`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{isSelected.selecte2}</Label>
                </div>
                <Label>Currect Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{test[1]?.answer}</Label>
                </div>
              </div>
              <div className="p-1 w-[250px] h-[180px] border">
                <Label>Your Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                    isSelected.selecte3 == test[2]?.answer
                      ? "bg-green-100 border-green-500"
                      : "bg-danger-200 border-danger-500"
                  }`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{isSelected.selecte3}</Label>
                </div>
                <Label>Currect Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{test[2]?.answer}</Label>
                </div>
              </div>
              <div className="p-1 w-[250px] h-[180px] border">
                <Label>Your Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                    isSelected.selecte4 == test[3]?.answer
                      ? "bg-green-100 border-green-500"
                      : "bg-danger-200 border-danger-500"
                  }`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{isSelected.selecte4}</Label>
                </div>
                <Label>Currect Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{test[3]?.answer}</Label>
                </div>
              </div>
              <div className="p-1 w-[250px] h-[180px] border">
                <Label>Your Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                    isSelected.selecte5 == test[4]?.answer
                      ? "bg-green-100 border-green-500"
                      : "bg-danger-200 border-danger-500"
                  }`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{isSelected.selecte5}</Label>
                </div>
                <Label>Currect Answer</Label>
                <div
                  className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                >
                  <Checkbox checked={true} id="terms2" disabled />
                  <Label>{test[4]?.answer}</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => navigate(-1)}
                className="bg-teal-400 hover:bg-teal-400"
              >
                back to class
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
            {page == 1 ? (
              <>
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                    Question 1
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  {test[0]?.question}
                </h2>

                <div className="space-y-4">
                  {[
                    test[0]?.option1,
                    test[0]?.option2,
                    test[0]?.option3,
                    test[0]?.option4,
                  ].map((valu: string, index) => (
                    <div
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border`}
                    >
                      <Checkbox
                        checked={isSelected.selecte1 == valu}
                        onCheckedChange={() =>
                          setIsSelected((prev) => ({
                            ...prev,
                            selecte1: valu,
                          }))
                        }
                      />
                      <Label>{valu}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleEndTest}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    End
                  </button>
                  <button
                    disabled={isSelected.selecte1 ? false : true}
                    onClick={() => setPage((prev) => (prev += 1))}
                    className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-400"
                  >
                    next
                  </button>
                </div>
              </>
            ) : page == 2 ? (
              <>
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                    Question 2
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  {test[1]?.question}
                </h2>

                <div className="space-y-4">
                  {[
                    test[1]?.option1,
                    test[1]?.option2,
                    test[1]?.option3,
                    test[1]?.option4,
                  ].map((valu: string, index) => (
                    <div
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border`}
                    >
                      <Checkbox
                        checked={isSelected.selecte2 == valu}
                        onCheckedChange={() =>
                          setIsSelected((prev) => ({
                            ...prev,
                            selecte2: valu,
                          }))
                        }
                      />
                      <Label>{valu}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleEndTest}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    End
                  </button>
                  <button
                    disabled={isSelected.selecte2 ? false : true}
                    onClick={() => setPage((prev) => (prev += 1))}
                    className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-400"
                  >
                    next
                  </button>
                </div>
              </>
            ) : page == 3 ? (
              <>
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                    Question 3
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  {test[2]?.question}
                </h2>

                <div className="space-y-4">
                  {[
                    test[2]?.option1,
                    test[2]?.option2,
                    test[2]?.option3,
                    test[2]?.option4,
                  ].map((valu: string, index) => (
                    <div
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border`}
                    >
                      <Checkbox
                        checked={isSelected.selecte3 == valu}
                        onCheckedChange={() =>
                          setIsSelected((prev) => ({
                            ...prev,
                            selecte3: valu,
                          }))
                        }
                      />
                      <Label>{valu}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleEndTest}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    End
                  </button>
                  <button
                    disabled={isSelected.selecte3 ? false : true}
                    onClick={() => setPage((prev) => (prev += 1))}
                    className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-400"
                  >
                    next
                  </button>
                </div>
              </>
            ) : page == 4 ? (
              <>
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                    Question 4
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  {test[3]?.question}
                </h2>

                <div className="space-y-4">
                  {[
                    test[3]?.option1,
                    test[3]?.option2,
                    test[3]?.option3,
                    test[3]?.option4,
                  ].map((valu: string, index) => (
                    <div
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border`}
                    >
                      <Checkbox
                        checked={isSelected.selecte4 == valu}
                        onCheckedChange={() =>
                          setIsSelected((prev) => ({
                            ...prev,
                            selecte4: valu,
                          }))
                        }
                      />
                      <Label>{valu}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleEndTest}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    End
                  </button>
                  <button
                    disabled={isSelected.selecte4 ? false : true}
                    onClick={() => setPage((prev) => (prev += 1))}
                    className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-400"
                  >
                    next
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                    Question 5
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  {test[4]?.question}
                </h2>

                <div className="space-y-4">
                  {[
                    test[4]?.option1,
                    test[4]?.option2,
                    test[4]?.option3,
                    test[4]?.option4,
                  ].map((valu: string, index) => (
                    <div
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border`}
                    >
                      <Checkbox
                        checked={isSelected.selecte5 == valu}
                        onCheckedChange={() =>
                          setIsSelected((prev) => ({
                            ...prev,
                            selecte5: valu,
                          }))
                        }
                      />
                      <Label>{valu}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleEndTest}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    End
                  </button>
                  {page == 5 ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={isSelected.selecte5 ? false : true}
                          type="button"
                          className="text-white bg-teal-400 hover:bg-teal-400"
                        >
                          submit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to submit your answers? you
                            cannot re attend this test.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>Cancel</AlertDialogAction>
                          <AlertDialogAction onClick={handleSubmit}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <button
                      disabled={isSelected.selecte5 ? false : true}
                      onClick={() => {
                        {
                          setPage((prev) => (prev < 5 ? (prev += 1) : prev));
                        }
                      }}
                      className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-400"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AssesmentTest;
