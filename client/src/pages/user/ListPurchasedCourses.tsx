import { ICategory } from "@/@types/categoryTpe";
import { ICourse } from "@/@types/courseType";
import { User } from "@/@types/userType";
import { getCategoryies } from "@/Api/instructor";
import { logout, puchasedCourses } from "@/Api/user";
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
import { removeUser } from "@/redux/authSlice";
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
  const dispatch  = useDispatch();
  useEffect(() => {
    const courses = async () => {
      const data = await puchasedCourses(userId);
      if (data.success) {
        console.log(data);
        
        setCourses(data.course);
      }else if(data.status == 403){
        const resp = await logout();
        if (resp.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(data.response.data.message);
          return navigate("/users/login");
        }
      }else{
        return toast.error(data.response.data.message);
      }
    };
    courses();
    const category = async () => {
      const data = await getCategoryies();
      if (data) {
        setCategories(data);
      }
    };
    category();
  }, [userId]);
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50">
      <Header />
      <ProfileNavbar />
      <main className="w-full mx-auto">
        {courses.length > 0 ? (
          <div className="relative flex flex-col items-center justify-content-center ">
            <div className="flex flex-wrap mx-5 mt-4 gap-3 m-auto  ">
              {courses.map((course: ICourse) => (
                <div
                  className={"w-[250px]  border shadow-lg overflow-hidden "}
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
                      <h6 className="font-medium leading-none overflow-hidden break-words">
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
