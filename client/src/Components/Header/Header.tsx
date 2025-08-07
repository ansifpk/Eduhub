import { useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { User } from '../../@types/userType';
import useRequest from '../../hooks/useRequest';
import userRoutes from '../../service/endPoints/userEndPoints';
import { removeUser } from '../../redux/authSlice';

const Header = () => {
   const [open,setOpen]  = useState(false)
   const id = useSelector((state:User)=>state.id);
   const [image,setImage] = useState('')
   const {doRequest,err} = useRequest()
   const navigate = useNavigate();
   const dispatch = useDispatch();

  const handleLogout = async () => {
    await doRequest({
      url:userRoutes.logout,
      method:"post",
      body:{},
      onSuccess:()=>{
        dispatch(removeUser());
        toast.success("logout");
        return navigate("/users/login");
      }
    })
  };
   
  //  useEffect(()=>{
  //    if(id){
  //         doRequest({
  //           url:`${userRoutes.profile}?userId=${id}`,
  //           method:"get",
  //           body:{},
  //           onSuccess:(res)=>{
  //             setImage(res.userData.avatar.avatar_url)
  //           }
  //         })
  //       } 
  //  },[id])
//  useEffect(()=>{
//   errors?.map((err)=>toast.error(err.message))
//  },[errors])

 const navbar = [{name:'Home',path:'/home'},{name:'Courses',path:'/users/courses'},{name:"Cart",path:'/users/cart'}]
  return (
    <>
      <div className='container-fluid px-5 flex justify-between h-16 items-center bg-teal-400 text-white font-semibold '>
         <span className='font-bold text-2xl flex items-center font-[poppins] text-gray-800' >EduHub</span>
         <div className='md:hidden cursor-pointer absolute right-8 top-0' >
          {open?(
            <>
              <i className="bi bi-x-lg" onClick={()=>setOpen(!open)}></i>
            </>
          ):(
            <>
              <i className="bi bi-list" onClick={()=>setOpen(!open)}></i>
            </>
          )}
        </div>
          <ul className='flex gap-5'>
            {navbar.map((val)=>(
              <li key={val.name}>
                <NavLink end to={val.path} className={({isActive})=>isActive?"bg-white rounded-full px-3 py-1 text-black underline font-semibold":""} >
                  {val.name}
                </NavLink>
              </li>
            ))}
            {id?(
              <li>
                {
                  image?
                   <img onClick={()=>navigate('/profile')} src={image} className='relative flex size-8 shrink-0 overflow-hidden rounded-full' />
                   :
                  <div>
                     
                     <select className='form-select' id="" >
                      <option value="">Profile</option>
                      <option onClick={handleLogout} value="">Sign Out</option>
                   </select>
                  </div>
                 
                } 
                
              </li>
             ):(
              <>
                 <li  ><NavLink to={'/'} className={"no-underline text-white"}>Login</NavLink></li>
                 <li  ><NavLink to={'/'} className={"no-underline text-white"}>SignUp</NavLink></li>
              </>
            )} 
          </ul>
      </div>
    </>
  )
}

export default Header
