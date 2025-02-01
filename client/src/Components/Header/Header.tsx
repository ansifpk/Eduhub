import {   Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '../ui/avatar';
import { User } from '@/@types/userType';
import { useEffect, useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ToggleButtonGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUserDetailes } from '@/Api/user';

const Header = () => {
   const [open,setOpen]  = useState(false)
   const id = useSelector((state:User)=>state.id);
   const [image,setImage] = useState('')
   useEffect(()=>{
     const fetching = async () => {
        const response = await getUserDetailes(id);   
        if(response.success){
          setImage(response.userData.avatar.avatar_url)
        }
     }
     fetching()
   },[])
 
  return (
    <div className='shadow-md  w-full fixed top-0 left-0 z-50'>
      <div className='md:flex bg-teal-500 items-center  justify-between md:px-10 px-7'>
        <div className='font-bold text-2xl flex items-center font-[poppins] text-gray-800'>
           EduHub
        </div>
        <div className='md:hidden cursor-pointer absolute right-8 top-0' >
          {open?(
            <ToggleButtonGroup onClick={()=>setOpen(!open)}  size="large"  aria-label="Large sizes">
            <CloseIcon  fontSize="large" />
          </ToggleButtonGroup>
          ):(
            <ToggleButtonGroup onClick={()=>setOpen(!open)} size="large"  aria-label="Large sizes">
            <MenuRoundedIcon fontSize="large" />
          </ToggleButtonGroup>
          )}
        </div>
        <ul className={`md:flex md:items-center  md:pb-0  pb-12 absolute md:static md:bg-teal-500 bg-teal-500    left-0 w-full md:w-auto md:pl-0 pl-9 transition-all durtion-500 ease-in ${open?'top-10':'top-[-490px]'} md:opasity-100 opasity-0`}>
           {[{name:'Home',path:'/'},{name:'Courses',path:'/users/courses'},{name:"Cart",path:'/users/cart'}].map((value,index)=>(
            <li key={index} className='md:ml-8  text-md  md:my-0 py-2.5 ' ><NavLink  className={({ isActive }) =>
              isActive 
                ? "no-underline bg-white rounded-4 px-3 py-1 text-black" 
                : "no-underline text-white"
            } to={value.path}>{value.name}</NavLink></li>
           ))
           }
           {id?(
                 <li className='md:ml-8  text-md  md:my-0 py-1 ' ><Link to={'/profile'}>
                 <Avatar>
                    <AvatarImage className='avatar' src={image?image:"https://github.com/shadcn.png"} />
                 </Avatar>
               </Link>  
               </li>
               ):(
                <>
                <li  className='md:ml-8  text-md  md:my-0 py-2 ' ><NavLink to={'/users/login'} className={"no-underline text-white"}>Login</NavLink></li>
                <li  className='md:ml-8  text-md  md:my-0 py-2 ' ><NavLink to={'/users/register'} className={"no-underline text-white"}>SignUp</NavLink></li>
                </>
               )}
         </ul>
      </div>
    </div>
  )
}

export default Header
