import {  Link,NavLink, useNavigate } from 'react-router-dom'
import './ProfileNavbar.css';
// import { logout } from '@/Api/user';
import {logout} from '../../Api/user'
// import { removeUser } from '@/redux/authSlice';
import { removeUser } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';

const ProfileNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async() => {
        const response = await logout();
        console.log(response,"response in logout")
         if(response.succuss){
          localStorage.setItem("accessToken","")
          localStorage.setItem("refreshToken","")
          dispatch(removeUser())
          return navigate("/login")
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
                <li  ><AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Link to={""} >Log Out</Link>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure to log out from EduHub?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className='rounded-full bg-[#49BBBD]' type='button'  >Cancel</AlertDialogAction>
                        <AlertDialogAction className='rounded-full bg-[#49BBBD]'  type='button' onClick={handleLogout} >Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog></li>
                {/* <li onClick={handleLogout} ><NavLink to={'/'}>Log Out</NavLink></li> */}
              </ul> 

       </div>
    </div>
  )
}

export default ProfileNavbar;
