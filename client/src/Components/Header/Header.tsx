import {  Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '../ui/avatar';



const Header = () => {
   interface User{
      id:string,
      name:string,
      email:string,
      isVerified:boolean,
      isBlock:boolean,
      isAdmin:boolean,
      isInstructor:boolean,
   }
   const id = useSelector((state:User)=>state.id);
   const navigate = useNavigate()
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
              } to={"/user/courses"}>Courses</NavLink></li>
                <li><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/cart'}>Cart</NavLink></li>
                <li ><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/wishlist'}>Wishlist</NavLink></li>
               {id?(
                 <li><Link to={'/profile'}>
                 <Avatar>
                    <AvatarImage className='avatar' src="https://github.com/shadcn.png" />
                 </Avatar>
               </Link>  
               </li>
               ):(
                <>
                <li ><NavLink to={'/login'}>Login</NavLink></li>
                <li ><NavLink to={'/register'}>SignUp</NavLink></li>
                </>
               )}
              </ul>
        </div>
       </div>
    </div>
  )
}

export default Header
