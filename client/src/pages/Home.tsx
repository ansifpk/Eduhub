import Header from "../Components/Header/Header";
// import './Home.css'
import Forstudnet from "../../src/assets/home-page/studnet.jpg";
import Forteachers from "../../src/assets/home-page/teacher-home.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { Button } from "@/Components/ui/button";
import { Image } from "@nextui-org/react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <Header />
      <div className="md:mt-14">
        <div className="flex items-center  justify-center  text-center bg-teal-400">
          <div className="mt-5">
            <p className="font-bold text-5xl text-white">
              Studying Online is now much easier
            </p>
            <Button
              onClick={() => navigate("/users/courses")}
              className="bg-zinc-400"
            >
              Join Free
            </Button>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#2dd4bf"
            fillOpacity="1"
            d="M0,224L80,234.7C160,245,320,267,480,266.7C640,267,800,245,960,224C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="flex gap-5 justify-center">
        <div
          className="bg-local rounded-2 text-white flex flex-col items-center justify-center md:w-1/3 h-[250px]"
          style={{
            backgroundImage: `linear-gradient(
                      rgba(4, 18, 19, 0.0),
                  rgba(10, 10, 10, 0.0)
                    ), url(${Forteachers})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="md:font-bold md:text-2xl font-semibold text-xl ">FOR INSTRUCTORS</span>
          <Button
            type="button"
            onClick={() => navigate("/instructor/login")}
            className="bg-gray-500/50 rounded-pill mt-3 text-white"
          >
            Start a class today
          </Button>
        </div>
        <div
          className="bg-local rounded-2 text-white flex flex-col items-center justify-center md:w-1/3 h-[250px]"
          style={{
            backgroundImage: `linear-gradient(
                      rgba(4, 18, 19, 0.0),
                  rgba(10, 10, 10, 0.0)
                    ), url(${Forstudnet})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="md:font-bold font-semibold text-xl md:text-2xl">FOR STUDENTS</span>
          <Button
            type="button"
            onClick={() => navigate("/users/courses")}
            className="bg-gray-500/50  rounded-pill mt-3"
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
