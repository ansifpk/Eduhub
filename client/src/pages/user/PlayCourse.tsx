import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import Header from "../../Components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Footer from "@/Components/Footer/Footer";
import { AspectRatio } from "@/Components/ui/aspect-ratio";
import { Image } from "lucide-react";
import { courseDetailes } from "@/Api/user";
import toast from "react-hot-toast";
import Courses from "./Courses";
import { ISection } from "@/@types/sectionType";
import { ICourse } from "@/@types/courseType";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";

const PlayCourse: React.FC = () => {
  const [course, setCourse] = useState<ICourse>();
  const [chapter, setChapter] = useState("");
  const { courseId } = useParams();

  useEffect(() => {
    //  console.log(courseId);
    const course = async () => {
      const course = await courseDetailes(courseId!);
      if (course.success) {
        setCourse(course.course);
       setChapter( course.course.sections[0].lectures[0].content.video_url);
       
      } else {
        return toast.error(course.response.data.message);
      }
    };
    course();
  }, []);
  console.log(course, "//");
  const handleCLick = (sectionId:number,lectureId:number) => {
     console.log('sectionId',sectionId,"lectureId",lectureId,course?.sections[sectionId].lectures[lectureId].content.video_url);
     setChapter(course?.sections[sectionId].lectures[lectureId].content.video_url! as string)
  }
  return (
    <div className="bg-blue-50">
      <Header />
      <ProfileNavbar />
      <main className="w-full  gap-10 d-flex   py-8">
        <AspectRatio ratio={10 / 9} className="bg-muted" style={{ width: '700px', }}>
          
          <video
            src={chapter}
            autoPlay
            controls
            loop
          />
          <h6 className="font-semibold m-3">Title : {course?.title}</h6>
          <h6 className="font-semibold m-1">Thumbnail : {course?.thumbnail}</h6>
        </AspectRatio>
        <div className="h-[200px] bg-red">
        <Accordion
              type="single"
              collapsible
              className="w-full border border-black"
            >
              {course?.sections.map((val, index) => (
                <AccordionItem key={index} value={"index"} className="mx-5">
                  <AccordionTrigger className="text-base font-bold hover:no-underline">
                    Section {index + 1} - {val.sectionTitle}
                  </AccordionTrigger>
                  {val.lectures.map((lecture, ind) => (
                    <AccordionContent
                      key={ind}
                      className="flex text-sm pt-3 border-t border-black items-center justify-between"
                    >
                      <div onClick={()=>handleCLick(index,ind)}>
                        Lecture {ind + 1} - {lecture.title}{" "}
                      </div>
                      <div>{lecture.duration}</div>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlayCourse;
