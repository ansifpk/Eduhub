import { removeUser } from "@/redux/authSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { logoutAdmin } from "@/Api/admin"

const AdminAside =  () => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const response = await logoutAdmin()
    if(response.succuss){
        dispatch(removeUser())
        return toast.success(response.message)
    }
  }

  return (
    <div className="col-md-2 sidebar bg-purple-600 sticky top-0">
        <div className="px-4">
          <div className="text-2xl font-bold text-white">
            <span className="inline-block transform">
              <div className="bg-white text-purple-600 p-2 rounded">
                EduHub
              </div>
            </span>
          </div>
        </div>
        <ul className="nav flex-column">
            <li><NavLink to="/admin/home" end className={({isActive}) =>
               isActive? "bg-white text-black text-sm px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} >
                 <div  className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Home
                 </div>
               </NavLink>
             </li>
            <li><NavLink to="/admin/students" end className={({isActive})=>
               isActive? "bg-white text-sm  text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} >
                 <div  className="flex items-center gap-2">
                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                   </svg>
                      Students
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm  text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/instructors" >
                 <div className=" flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                    Instructors
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/reports" >
                 <div className=" flex items-center gap-2  rounded">
                 
                 <CloudDownloadIcon/>
                    Reports
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/courses">
                 <div className=" flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                 </svg>
                    Courses
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/category">
                 <div className=" flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Category
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/coupon">
                 <div className=" flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                 </svg>
                  Coupons
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 text-sm mt-2 flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/messages">
                 <div className=" flex items-center gap-2  rounded">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                  Messages
                 </div>
               </NavLink>
             </li>
             <li><NavLink end className={({isActive}) =>
               isActive? "bg-white text-sm text-black px-4 py-2 mt-2 flex items-center  rounded"
                  :"px-4 py-2 mt-2 text-sm flex items-center  rounded"
            } style={{ textDecoration: "none" , color:"white"}} to="/admin/subscriptions">
                 <div className=" flex items-center gap-2  rounded">
                 {/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg> */}
              
                <CardMembershipIcon/>
                  Subscriptions
                 </div>
               </NavLink>
             </li>
             <li><NavLink style={{ textDecoration: "none"}} onClick={handleLogout} to={'/admin/login'}>
                 <div className="px-4 text-sm py-2 mt-2 text-warning flex items-center gap-2  rounded">
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

export default AdminAside
