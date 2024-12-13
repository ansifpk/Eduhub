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
import { useNavigate } from "react-router-dom";
import {  ResizablePanel, ResizablePanelGroup } from "@/Components/ui/resizable";
import { ICourse } from "@/@types/courseType";
import FilterHeader from "@/Components/user/FilterHeader";
import ApiCourse from "@/service/course";
import axios from "axios";
import { ICategory } from "@/@types/categoryTpe";
import { getCategoryies } from "@/Api/instructor";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    
    const category = async () => {
     
     const data = await getCategoryies()
     
      if(data){
       setCategories(data);
      }
    };
    category();
  }, []);
  
  const navigate = useNavigate();

  const handleCoursesfromChild = (courses:ICourse[]) => {
   
    setCourses(courses)
  }
  return (
    <div>
      <Header />
      <FilterHeader onsendcourse={handleCoursesfromChild} categories={categories} />
      {courses.length > 0 ? (
        <div className="relative flex justify-content-center ">
          <div className="flex flex-wrap mx-5 mt-4 gap-3 m-auto  ">
            {courses.map((course) => (
              <div className=" w-[250px]  border shadow-lg" key={"course._id"}  >
                  <div className="overflow-hidden rounded-md m-1">
                    <img
                      src={course.image.image_url}
                      alt={course.title}
                      width={250}
                      height={300}
                      className={
                        "h-auto w-auto object-cover transition-all hover:scale-105 border rounded-2  shadow-sm "
                      }
                    />
                  </div>
              <div className=" text-sm m-2">
                <h6 className="font-medium leading-none">{course.title}</h6>
                <p className="font-medium text-xs text-muted-foreground" >{course.instructorId.name}</p>
                <p className="font-medium text-xs text-muted-foreground">Price: {course.price}</p>
                <Button onClick={()=>navigate(`/users/courseDetailes/${course._id}`)} className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]">view Details</Button>
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

      <Footer />
    </div>
  );
};

export default Courses;
