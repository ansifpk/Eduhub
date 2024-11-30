import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from "react";
import { getCourses } from "@/Api/user";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/Components/ui/resizable";
import { ICourse } from "@/@types/courseType";
import FilterHeader from "@/Components/user/FilterHeader";
interface Course {
  _id: string;
  title: string;
  instructorId: {
    name:string
  };
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
  imageUrl: string;
  videoUrl: string[];
  createdAt: string;
}
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const courses = async () => {
      const res = await getCourses();
      if (res.success) {
        console.log(res.courses);
        setCourses(res.courses);
      }
    };
    courses();
  }, []);
  
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <FilterHeader />
      {courses.length > 0 ? (
        <div className="grid grid-cols-4 gap-20 m-16 ">
          {courses.map((val:ICourse)=>(
           <ResizablePanelGroup key={val._id}
           onClick={()=>navigate(`/user/courseDetailes/${val._id}`)}
           direction="horizontal"
           className="max-w-md rounded-lg border md:min-w-[300px]"
         >
           <ResizablePanel defaultSize={100}>
             <div className="flex h-[200px] ">
               <img src={val.image.image_url} alt=""/>
             </div>
             <div className="h-[70px] items-center px-6 pt-2 pb-6 border-black border-t">
               <h5 className="font-semibold">
                Title : {val.title}
              </h5>
               <div className="flex h-full items-center justify-between">
                 <div className="font-semibold">Created : {val?.instructorId?.name}</div>
                 <div className="font-semibold">Price : {val.price}</div>
               </div>
              
             </div>
           </ResizablePanel>
         </ResizablePanelGroup>
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

      <Footer />
    </div>
  );
};

export default Courses;
