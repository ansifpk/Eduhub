import {  NavLink } from 'react-router-dom'
import './ProfileNavbar.css';
// import { logout } from '@/Api/user';
import {logout} from '../../Api/user'
// import { removeUser } from '@/redux/authSlice';
import { removeUser } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

const ProfileNavbar = () => {
    const dispatch = useDispatch();
    const handleLogout = async() => {
        const response = await logout();
        console.log(response,"response in logout")
         if(response.succuss){
          localStorage.setItem("accessToken","")
          localStorage.setItem("refreshToken","")
          dispatch(removeUser())
         }
    }
  return (
    <div>
       <div className='profile-navbar'>
              <ul>
                <li ><NavLink end  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/profile'}>Profile</NavLink></li>
                <li ><NavLink  end className={({ isActive }) =>
                isActive 
                 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/profile/courses'}>Courses</NavLink></li>
                <li><NavLink end  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/profile/message'}>Messages</NavLink></li>
                <li><NavLink end  className={({ isActive }) =>
                isActive 
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline" 
                  : "no-underline text-white"
              } to={'/profile/coupons'}>Coupons</NavLink></li>
                <li onClick={handleLogout} ><NavLink to={'/'}>Log Out</NavLink></li>
              </ul> 

       </div>
    </div>
  )
}

export default ProfileNavbar;
