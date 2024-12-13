import Header from '../Components/Header/Header';
import './Home.css'
import Forstudnet from '../../src/assets/home-page/studnet.jpg'
import Forteachers from '../../src/assets/home-page/teacher-home.jpg'
import { useNavigate } from "react-router-dom";
import Footer from '../Components/Footer/Footer';

const Home: React.FC = () => {
   const navigate  = useNavigate();
  return (
    <div className="home">
       <Header/>
       <div className="hero">
          <div className="curve-image">
               <p >Studying Online is now much easier</p>
               {/* <p >EduHUb is an interesting platform that will teach you in more an interactive way</p> */}
               <div className="hero-buttons">
                 <button onClick={()=>navigate('/courses')} className="btn">Join Free</button>
                 <button onClick={()=>navigate('/subscription')} className="btn">Buy Subcription</button>
               </div>
          </div>
          <svg className="curv" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#49BBBD" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,266.7C640,267,800,245,960,224C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
       </div> 
  
          <div className="card-container">
           <div className="card">
            <img
              src={Forteachers}
              className="card-img"
              alt="For Instructors"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
              <h3 className="card-title">FOR INSTRUCTORS</h3>
              <button type="button" onClick={()=>navigate('/instructor/login')} className="btn btn-outline-light rounded-pill mt-3">Start a class today</button>
            </div>
       </div>
           <div className="card">
            <img
              src={Forstudnet}
              className="card-img"
              alt="For Instructors"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
              <h3 className="card-title">FOR STUDENTS</h3>
              <button type="button" onClick={()=>navigate('/courses')} className="btn btn-outline-light rounded-pill mt-3">Explore our Courses</button>
            </div>
       </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default Home;
