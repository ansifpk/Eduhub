import {  Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '../ui/avatar';
import { User } from '@/@types/userType';
import { useEffect, useState } from 'react';
import { getUserDetailes } from '@/Api/user';



const Header = () => {
   
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
    <div>
       <div className='navbar'>
        <div className='navbar-left'>
           <h2>EduHub</h2>
        </div>
        <div className='navbar-right'>
              <ul className='check'>
                <li ><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/'}>Home</NavLink></li>
                <li ><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={"/users/courses"}>Courses</NavLink></li>
                <li><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/users/cart'}>Cart</NavLink></li>
               {id?(
                 <li><Link to={'/profile'}>
                 <Avatar>
                    <AvatarImage className='avatar' src={image?image:"https://github.com/shadcn.png"} />
                 </Avatar>
               </Link>  
               </li>
               ):(
                <>
                <li ><NavLink to={'/users/login'}>Login</NavLink></li>
                <li ><NavLink to={'/users/register'}>SignUp</NavLink></li>
                </>
               )}
              </ul>
        </div>
       </div>
    </div>
  )
}

export default Header
