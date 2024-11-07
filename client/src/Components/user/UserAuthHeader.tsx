import { NavLink } from 'react-router-dom'
import { CardDescription, CardHeader } from '../ui/card'

const UserAuthHeader = () => {
  return (
    <div className='d-flex justify-center'>
      <CardHeader>
        <div className='text-2xl mb-2 font-bold text-center text-[#49BBBD]'>WELCOME to Eduhub</div>
        <CardDescription className='text-center'>
          <span className='rounded-full py-2 px-5 bg-[rgba(73,187,189,0.6)] text-white text-2xl font-bold flex justify-center gap-20'>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white px-5 py-1 rounded-full bg-[#49BBBD] no-underline"
                    : "no-underline text-white"
                }
                to="/register"
              >
                Register
              </NavLink>
            </span>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white px-5 py-1 rounded-full bg-[#49BBBD] no-underline"
                    : "no-underline text-white"
                }
                to="/login"
              >
                Login
              </NavLink>
            </span>
          </span>
          <br />
          Please fill in the given information.
        </CardDescription>
      </CardHeader>
    </div>
  );
};

export default UserAuthHeader;
