import { ICategory } from "@/@types/categoryTpe";
import { ICourse } from "@/@types/courseType";
import { User } from "@/@types/userType";
// import { getCategoryies } from "@/Api/instructor";
// import {  puchasedCourses } from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription } from "@/Components/ui/card";
import { ResizablePanel, ResizablePanelGroup } from "@/Components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import useRequest from "@/hooks/useRequest";
import { removeUser } from "@/redux/authSlice";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import userRoutes from "@/service/endPoints/userEndPoints";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListPurchasedCourses: React.FC = () => {

  const userId = useSelector((state: User) => state.id);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  
  const {doRequest,errors} = useRequest()
  const {doRequest:getCategory,errors:categoryErrors} = useRequest()

  useEffect(() => {
    const courses = async () => {
      await doRequest({
        url:`${userRoutes.puchasedCourses}/${userId}`,
        method:"get",
        body:{},
        onSuccess:(res)=>{
          setCourses(res.course);
        }
      })
    };
    courses();

    const category = async () => {
      await getCategory({
        url:`${instructorRoutes.getCategoryies}`,
        method:"get",
        body:{},
        onSuccess:(res)=>{
          setCategories(res);
        }
      })
    };
    category();
  }, [userId]);

  const navigate = useNavigate();
//! errors....
useEffect(()=>{
  errors?.map((err)=>toast.error(err.message))
  categoryErrors?.map((err)=>toast.error(err.message))
},[categoryErrors,errors])

  return (
    <div className="bg-blue-50 h-screen">
      <Header />
      <ProfileNavbar />
      <main className="w-full mx-auto">
        {courses.length > 0 ? (
            <div className="grid md:grid-cols-4 grid-cols-2 md:mx-5 mx-2 md:mt-4 gap-2 md:gap-3 ">
              {courses.map((course: ICourse) => (
                <div
                  className={"md:w-[250px] w-[230px]  border shadow-lg overflow-hidden "}
                  key={course._id}
                >
                  <div className=" overflow-hidden border rounded-md m-1 ">
                    <img
                      src={course.image.image_url}
                      alt={course.title}
                      width={150}
                      height={150}
                      className={
                        "h-[150px] w-full object-fill transition-all hover:scale-105 aspect-square"
                      }
                    />
                  </div>
                  <div className=" text-sm m-2 ">
                    <div className="flex flex-wrap ">
                      <h6 className="font-medium leading-none  break-words md:text-sm text-xs">
                        {course.title}
                      </h6>
                    </div>
                    <p className="font-medium text-xs text-muted-foreground">
                      Created : {course.instructorId.name} <br />
                      Price: {course.price}
                    </p>
                    <div className="space-y-1">
                      <Button
                        type="button"
                        onClick={() =>
                          navigate(`/user/playCourse/${course._id}`)
                        }
                        className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]"
                      >
                        Go To Class
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        ) : (
          <>
            <div className=" h-full flex justify-center items-center">
              <Card className="w-1/2 h-[200px] d-flex justify-center items-center">
                <CardContent className="d-flex items-center">
                  <CardDescription>No courses available</CardDescription>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ListPurchasedCourses;
