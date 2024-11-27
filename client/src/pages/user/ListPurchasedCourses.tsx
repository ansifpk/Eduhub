import { Course } from "@/@types/mainCourse";
import { User } from "@/@types/userType";
import { puchasedCourses } from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import { Card, CardContent, CardDescription } from "@/Components/ui/card";
import { ResizablePanel, ResizablePanelGroup } from "@/Components/ui/resizable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const ListPurchasedCourses :React.FC = () => {
   
  const userId = useSelector((state:User)=>state.id)
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const courses = async () => {
      const res = await puchasedCourses(userId);
      console.log(res,"re");
      
      if (res.success) {
        // const arr = res.success.filter((val:Course)=>val.instructorId._id == userId)
        // setCourses(res.courses);
      }
    };
    courses();
  }, []);
  const navigate = useNavigate()
  const handleProfile = async () =>{
    navigate("/editUser")
  }
  return (
    <div className='bg-blue-50'>
    <Header />
    <ProfileNavbar/>
    <main className="w-full mx-auto"> 
    {courses.length > 1 ? (
        <div className="grid grid-cols-4 gap-20 m-16 ">
          {courses.map((val:Course)=>(
           <ResizablePanelGroup key={val._id}
           onClick={()=>navigate(`/user/courseDetailes/${val._id}`)}
           direction="horizontal"
           className="max-w-md rounded-lg border md:min-w-[300px]"
         >
           <ResizablePanel defaultSize={100}>
             <div className="flex h-[200px] ">
               <img src={val.imageUrl} alt=""/>
             </div>
             <div className="h-[70px] items-center px-6 pt-2 pb-3 border-black border-t">
               <h5 className="font-semibold">
                Title : {val.title}
              </h5>
               <div className="flex h-full items-center justify-between">
                 <div className="font-semibold">Created : {"val.instructorId.name"}</div>
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
                <CardDescription>No courses purchased</CardDescription>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </main>
    <Footer />
  </div>
  )
}

export default ListPurchasedCourses
