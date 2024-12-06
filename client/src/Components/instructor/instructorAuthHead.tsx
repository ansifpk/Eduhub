import { CardDescription, CardHeader } from '../ui/card'
import { NavLink } from 'react-router-dom'

const InstructorAuthHead = () => {
  return (
    <div className='d-flex justify-center'>
    <CardHeader>
        <div className='text-2xl mb-2 font-bold text-center text-[#49BBBD]'>WELCOM to Eduhub</div>
         <CardDescription className='text-center '>
          <span className='rounded-full py-2 px-5  bg-[rgba(73,187,189,0.6)] text-white text-2xl font-bold flex justify-center gap-20'>
            <span><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-white px-5 py-1 rounded-full bg-[#49BBBD] no-underline" 
                  : "no-underline text-white"
              } to={"/instructors/register"}> Register</NavLink>
             </span>
            <span><NavLink  className={({ isActive }) =>
                isActive 
                  ? "text-white px-5 py-1 rounded-full bg-[#49BBBD] no-underline" 
                  : "no-underline text-white"
              } to={"/instructors/login"}> Login</NavLink>
            </span>
          </span><br/>
                 Please fill the Given Informations.
         </CardDescription>
    </CardHeader>
    </div>
  )
}

export default InstructorAuthHead
