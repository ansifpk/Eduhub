import { Button } from "../../components/ui/button";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import { useNavigate } from "react-router-dom";
import Forstudents from "../../assets/home-page/studnet.jpg";
import Forteachers from "../../assets/home-page/teacher-home.jpg";
import StarBorder from "../../components/StarBorder";
import { ArrowRightCircleIcon } from "lucide-react";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-5">
      <Header />
      <div
        style={{
          backgroundImage: `url(${Forteachers})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex items-center justify-center  text-center min-h-screen"
      >
        <div className="flex flex-col space-y-5 items-center justify-center-safe">
          <p className="font-bold text-5xl text-white">
            Studying Online is now much easier
          </p>
          <StarBorder as="button" thickness={3} color="red" speed="2s">
            <Button
              type="button"
              onClick={() => navigate("/user/courses")}
              className={"text-white w-50 cursor-pointer text-center"}
            >
              Explore Courses{" "}
              <ArrowRightCircleIcon className="animate-pulse " />
            </Button>
          </StarBorder>
        </div>
      </div>

      <div className="text-center font-semibold my-5">
        <h1 className="text-4xl font-extrabold">What is EduHub?</h1>
        <div className="w-[75%] mx-auto">
          Eduhub is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage
          assignments, quizzes and exams; monitor due dates; grade results and
          provide students with feedback all in one place.
        </div>
      </div>

      <div className="flex gap-5 md:mx-0 mx-2 justify-center">
        <div
          className="bg-local rounded-lg text-white flex flex-col items-center justify-center md:w-1/3 w-full h-[250px]"
          style={{
            backgroundImage: `linear-gradient(
                      rgba(4, 18, 19, 0.0),
                  rgba(10, 10, 10, 0.0)
                    ), url(${Forteachers})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="md:font-bold md:text-2xl font-semibold text-xl ">
            FOR INSTRUCTORS
          </span>
          <Button
            type="button"
            onClick={() => navigate("/instructor/login")}
            className={
              "bg-gray-500/50 rounded-full text-white mt-3  cursor-pointer"
            }
          >
            Start a class today
          </Button>
        </div>
        <div
          className="bg-local rounded-lg text-white flex flex-col items-center justify-center md:w-1/3 w-full h-[250px]"
          style={{
            backgroundImage: `linear-gradient(
                      rgba(4, 18, 19, 0.0),
                  rgba(10, 10, 10, 0.0)
                    ), url(${Forstudents})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="md:font-bold font-semibold text-xl md:text-2xl">
            FOR STUDENTS
          </span>
          <Button
            type="button"
            onClick={() => navigate("/user/courses")}
            className={
              "bg-gray-500/50 rounded-full text-white mt-3  cursor-pointer"
            }
          >
            Explore our Courses
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
