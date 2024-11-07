import { logout } from "@/Api/user"
import { removeUser } from "@/redux/authSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"


const InstructorAsside = () => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const response = await logout()
    if(response.succuss){
        dispatch(removeUser())
      return  toast.success("Instructor Logout Sucessfully")
    }
  }
  return (
    <div className="col-md-2 sidebar bg-blue-600 sticky top-0">
        <div className="p-4">
          <div className="text-2xl font-bold text-white">
            <span className="inline-block transform">
              <div className="bg-white text-blue-600 p-2 rounded">
                EduHub
              </div>
            </span>
          </div>
        </div>
        <ul className="nav flex-column">
            <li><NavLink to="/instructor" style={{ textDecoration: "none" , color:"white"}} >
                 <div className="px-4 py-2 mt-2 flex items-center gap-2  rounded">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Home
                 </div>
               </NavLink>
             </li>
            <li><NavLink to="/instructor/students" style={{ textDecoration: "none" , color:"white"}} >
                 <div className="px-4 py-2 mt-2 flex items-center gap-2  rounded">
                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                   </svg>
                      Students
                 </div>
               </NavLink>
             </li>
             <li><NavLink style={{ textDecoration: "none" , color:"white"}} to="/instructor/courses">
                 <div className="px-4 py-2 mt-2 flex items-center gap-2  rounded">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                    Courses
                 </div>
               </NavLink>
             </li>
             <li><NavLink style={{ textDecoration: "none" , color:"white"}} to="/instructor/messages">
                 <div className="px-4 py-2 mt-2 flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                  Messages
                 </div>
               </NavLink>
             </li> 
             <li><NavLink style={{ textDecoration: "none"}} onClick={handleLogout} to={'/instructor/login'}>
                 <div className="px-4 py-2  mt-5 text-warning flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                 </svg>
                  Sign Out
                 </div>
               </NavLink>
             </li>    
        </ul>
        </div>

  )
}

export default InstructorAsside
