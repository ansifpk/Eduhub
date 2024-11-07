import {  Link, NavLink } from 'react-router-dom'
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
   
  return (
    <div>
       <div className='navbar'>
        <div className='navbar-left'>
           <h2>EduHub</h2>
        </div>
        <div className='navbar-right'>
             
             {id?(
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
              } to={'/courses'}>Courses</NavLink></li>
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
                <li><Link to={'/profile'}>
                  <Avatar>
                     <AvatarImage className='avatar' src="https://github.com/shadcn.png" />
                  </Avatar>
                </Link>  
                </li>
              </ul>
             ):(
               <ul>
                <li ><NavLink to={'/'}>Home</NavLink></li>
                <li ><NavLink to={'/courses'}>Courses</NavLink></li>
                <li><NavLink to={'/cart'}>Cart</NavLink></li>
                <li ><NavLink to={'/wishlist'}>Wishlist</NavLink></li>
                <li ><NavLink to={'/login'}>Login</NavLink></li>
                <li ><NavLink to={'/register'}>SignUp</NavLink></li>
              </ul>
             )}
                
            
        </div>
       </div>
    </div>
  )
}

export default Header
